"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROF_LIST } from "@/constants/prof-list";
import { STUDENTS_LIST } from "@/constants/students-list";
import { useAuthToken } from "@/hooks/auth-token";
import { useEnvState } from "@/hooks/env-state";
import { useFetchCurrentAttendance } from "@/hooks/fetch-current-attendance";
import { useFetchSections } from "@/hooks/fetch-sections";
import { useFetchSubjects } from "@/hooks/fetch-subjects";
import { useLogin } from "@/hooks/login";
import { usePostAttendance } from "@/hooks/post-attendance";
import { SectionInfoResponse, SubjectInfoResponse } from "@/types/class-profile";
import { ProfProfile } from "@/types/prof-profile";
import { AttendanceResponse } from "@/types/student-profile";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { RefreshCcwIcon } from "lucide-react";
import { env } from "process";
import { useEffect, useState } from "react";

export default function Home() {

  const [selectedProf, setSelectedProf] = useState<ProfProfile | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfoResponse["subjects"][0] | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionInfoResponse["sections"][0] | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<AttendanceResponse["attendance"]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProxy, ] = useEnvState();
  const [apiUrl, setApiUrl] = useState(env.apiUrl);
  
  const { authToken, setAuthToken } = useAuthToken();
  const { mutateAsync: login } = useLogin();
  const { data: subjects, isFetched: isSubjectsFetched } = useFetchSubjects({ authToken: authToken || "", apiUrl: apiUrl || "" });
  const { data: sections, isFetched: isSectionsFetched } = useFetchSections({ subjectId: selectedSubject?.id || 0, authToken: authToken || "", apiUrl: apiUrl || "" });
  const { data: currentAttendance } = useFetchCurrentAttendance({ authToken: authToken || "", programId: 1, termId: 4, subjectId: selectedSubject?.id || 0, sectionId: selectedSection?.id || 0, apiUrl: apiUrl || "" });
  const { mutateAsync: postAttendance } = usePostAttendance();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isProxy) {
      setApiUrl('http://proxy.nimbushq.xyz/api');
    } else {
      setApiUrl('http://10.10.1.35/api');
    }
  }, [isProxy]);

  const handleLogin = async () => {
    if (!selectedProf) return;
    const data = await login({ prof: selectedProf, apiUrl: apiUrl || "" });
    if (data.token) {
      setAuthToken(data.token);
      setIsLoggedIn(true);
    }
  }

  const handleRandomize = () => {
    const selectedStudents: AttendanceResponse["attendance"] = [];
    currentAttendance?.attendance.forEach(item => {
      if (STUDENTS_LIST.includes(item.student.rollno)) {
        selectedStudents.push(item);
      } else {
        if (Math.random() < 0.8) {
          selectedStudents.push(item);
        }
      }
    })
    setSelectedStudents(selectedStudents);
  }

  const handleMarkAttendance = async () => {
    console.log(selectedStudents);
    selectedStudents.forEach(async (item) => {
      await postAttendance({ authToken: authToken || "", id: item.id, pageid: item.pageid, program_id: 1, term_id: 4, subject_id: item.subject_id, section_id: item.section_id, student_id: item.student_id, apiUrl: apiUrl || "" });
    })
    setSelectedStudents([]);
  }

  const handleLogout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    queryClient.invalidateQueries({ queryKey: ["current-attendance"] });

    setSelectedProf((prev) => {
      if (prev) {
        return null;
      }
      return prev;
    });
  }

  return (
    <div className="flex flex-col items-start justify-start h-screen w-screen overflow-y-scroll md:overflow-hidden">
      <Header />
      <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-4 w-full h-full p-4">
        <Card className="min-w-1/3 w-fit h-full">
          <CardHeader className="flex flex-col items-start justify-start gap-2">
            <CardTitle className="text-2xl font-bold">
              Class Information
            </CardTitle>
            <CardDescription>
              Enter the class information here to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-start gap-4 py-4">
              <div className="flex flex-col w-full items-start justify-start gap-2">
                <Label>Choose Professor</Label>
                <div className="flex flex-wrap items-center justify-between w-full gap-4">
                  <Select disabled={isLoggedIn} onValueChange={(value) => {
                    const prof = JSON.parse(value) as ProfProfile;
                    console.log(prof);
                    if (prof) {
                      setSelectedProf(prof);
                    }
                  }}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Professor">{selectedProf?.name || "Select Professor"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {PROF_LIST.map((prof) => (
                        <SelectItem key={prof.id} value={JSON.stringify(prof)}>
                          {prof.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full" disabled={!selectedProf} onClick={isLoggedIn ? handleLogout : handleLogin}>{isLoggedIn ? "Logout" : "Login"}</Button>
                </div>
              </div>
              {isLoggedIn && subjects?.subjects && subjects?.subjects?.length > 0 && (
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                  <Label>Choose Subject</Label>
                  <div className="flex flex-wrap items-center justify-between w-full gap-4">
                    <Select onValueChange={(value) => {
                      const subject = JSON.parse(value) as SubjectInfoResponse["subjects"][0];
                      if (subject) {
                        setSelectedSubject(subject);
                      }
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Subject">{selectedSubject?.name || "Select Subject"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {subjects?.subjects?.map((subject) => (
                          <SelectItem key={subject.id} value={JSON.stringify(subject)}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {isLoggedIn && subjects?.subjects && subjects?.subjects?.length > 0 && isSubjectsFetched && selectedSubject && (
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                  <Label>Choose Section</Label>
                  <div className="flex flex-wrap items-center justify-between w-full gap-4">
                    <Select onValueChange={(value) => {
                      const section = JSON.parse(value) as SectionInfoResponse["sections"][0];
                      if (section) {
                        setSelectedSection(section);
                      }
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Section">{selectedSection?.name || "Select Section"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {sections?.sections?.map((section) => (
                          <SelectItem key={section.id} value={JSON.stringify(section)}>
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col items-start justify-start w-full h-full">
          {isSectionsFetched && selectedSection && (
            <Card className="w-full flex-1 h-fit overflow-hidden">
              <CardHeader className="flex flex-col md:flex-row items-center justify-between px-4">
                <CardTitle className="text-2xl w-fit font-bold">Attendance Details</CardTitle>
                <div className="flex flex-col md:flex-row items-center w-fit justify-center gap-4 text-sm">
                  <Label className="hidden md:block text-sm">{`Selected Students : (${selectedStudents.length} / ${currentAttendance?.attendance.length})`}</Label>
                  <Button variant="outline" size="icon">
                    <RefreshCcwIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={handleRandomize}>
                    Randomize 80%
                  </Button>
                  <Button onClick={handleMarkAttendance}>
                    Mark Attendance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-full w-full overflow-y-scroll overflow-x-hidden">
                  <div className="min-h-full flex items-center pb-28 justify-start w-full gap-4 flex-wrap">
                    {
                      currentAttendance?.attendance.map(item => {
                        return (
                          <button onClick={() => {
                            setSelectedStudents(prev => {
                              if (prev.find(student => student.id === item.id)) {
                                return prev.filter(student => student.id !== item.id);
                              }
                              return [...prev, item];
                            });
                          }} key={item.id} className={clsx("flex flex-1 flex-col items-center rounded-md justify-between transition-colors gap-2 p-4 w-32 h-24", selectedStudents.find(student => student.id === item.id) ? "bg-yellow-500" : item.status === 1 ? "bg-green-500" : "bg-red-500")}>
                            <Label className="text-md font-bold">{item.student.rollno}</Label>
                            <Label className="text-[10px] text-center">{item.student.name}</Label>
                          </button>
                        )
                      })
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div >
  );
}
