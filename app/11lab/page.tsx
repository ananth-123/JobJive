"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

//import { setCookie  } from "@/lib/utils"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import styles from "../Home.module.css"

export default function Page() {
  const [tab, setTab] = useState("interviewers")
  const [record, setRecord] = useState("previous")
  const [start, setStart] = useState(false)
  const [ivdata, setIvdata] = useState({})
  const { push } = useRouter()

  useEffect(() => {
    localStorage.setItem("interview", JSON.stringify(ivdata))
    //console.log(localStorage.getItem("interview"))
  }, [ivdata])

  return (
    <div className="flex justify-center bg-grid-slate-200 bg-blend-lighten z-10 min-h-screen">
      <div className={styles.bgCustom1}>
        <div className={styles.bgCustom2}></div>
      </div>

      <main className="max-w-6xl w-[100%] px-2 py-6 flex justify-center h-fit">
        <>
          <div className="flex flex-col justify-center items-center space-y-5">
            <p className="font-extrabold text-6xl mt-14">
              Welcome Back,
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent ">
                {" "}
                Steve!
              </span>
            </p>
            <Tabs
              value={tab}
              className="w-[120%] dark:bg-white dark:text-white pt-10"
            >
              <TabsList className="grid w-full grid-cols-1 mb-10 bg-transparent">
                <TabsTrigger
                  value="interviewers"
                  className="text-lg p-4 border-inherit border-2"
                >
                  Customise Session
                </TabsTrigger>
                <TabsTrigger value="description" className="invisible">
                  DESCRIPTION
                </TabsTrigger>
              </TabsList>
              <TabsContent value="interviewers">
                <Card className="w-full dark:bg-white text-lg py-5 pl-8">
                  <CardHeader>
                    <CardTitle className="text-2xl pb-4">
                      Interviewers
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Select your Interviewers based on your need.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <RadioGroup
                      onValueChange={(value) => {
                        setIvdata({ ...ivdata, avatar: value })
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="CYw3kZ02Hs0563khs1Fj" id="r1" />
                        <Label className="text-md pl-2" htmlFor="r1">
                          Dave - IBM
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 text-lg">
                        <RadioGroupItem value="21m00Tcm4TlvDq8ikWAM" id="r2" />
                        <Label className="text-md pl-2" htmlFor="r2">
                          Rachel- TSMC
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 text-md">
                        <RadioGroupItem value="bVMeCyTHy58xNoL34h3p" id="r3" />
                        <Label className="text-md pl-2" htmlFor="r3">
                          Jeremy - Google
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="text-[1.05rem] mt-5"
                      onClick={() => {
                        setTab("description")
                      }}
                    >
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="description">
                <Card className="w-full dark:bg-white text-lg py-5 pl-8">
                  <CardHeader>
                    <CardTitle className="text-2xl pb-4">Description</CardTitle>
                    <CardDescription className="text-lg">
                      Select Your Job Role.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <RadioGroup
                      onValueChange={(value) => {
                        setIvdata({ ...ivdata, avatar: value })
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Web Developer" id="r1" />
                        <Label className="text-md pl-2" htmlFor="r1">
                          Web Developer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 text-lg">
                        <RadioGroupItem value="Software Engineer" id="r2" />
                        <Label className="text-md pl-2" htmlFor="r2">
                          Software Engineer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 text-md">
                        <RadioGroupItem value="Business Executive" id="r3" />
                        <Label className="text-md pl-2" htmlFor="r3">
                          Web Executive
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="text-[1.05rem] mt-5 me-2"
                      onClick={() => {
                        setTab("interviewers")
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      className="text-[1.05rem] mt-5"
                      onClick={() => {
                        push("/start")
                      }}
                    >
                      Start the Interview
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs
              defaultValue="previous"
              className="w-full dark:bg-white dark:text-white pt-14"
            >
              <TabsList className="grid w-full grid-cols-2 dark:bg-white dark:text-black">
                <TabsTrigger value="previous">LAST SCORE</TabsTrigger>
                <TabsTrigger value="past">PAST RECORDS</TabsTrigger>
              </TabsList>
              <TabsContent value="previous">
                <Card className="w-[600px]">
                  <CardHeader>
                    <CardTitle>Last Score</CardTitle>
                    <CardDescription>
                      Details of your last Interview.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>well done</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="past">
                <Card className="w-600">
                  <CardHeader>
                    <CardTitle>All Records</CardTitle>
                    <CardDescription>
                      Details of Previous record.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      31/07/2023 01:10PM Nice work but need to change Accent.
                    </div>
                    <div>
                      30/07/2023 03:10PM Good Job with last Performance.
                    </div>
                    <div>28/07/2023 02:10PM Resume looks Good.</div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      </main>
    </div>
  )
}
