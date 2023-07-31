"use client"

import React, { useEffect, useState } from "react"

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
import { Textarea } from "../../components/ui/textarea"

export default function Page() {
  const [tab, setTab] = useState("interviewers")
  const [record, setRecord] = useState("previous")
  const [start, setStart] = useState(false)
  const [ivdata, setIvdata] = useState({})

  useEffect(() => {
    localStorage.setItem("interview", JSON.stringify(ivdata))
    //console.log(localStorage.getItem("interview"))
  }, [ivdata])

  return (
    <>
      <main className="m-5 space-x-4 space-y-4">
        <>
          {start == false ? (
            <>
              <div className="flex flex-col justify-center items-center space-y-5">
                <p className="text-xl">Hello Balayya</p>
                <Tabs
                  value={tab}
                  className="w-[600px] dark:bg-white dark:text-white"
                >
                  <TabsList className="grid w-full grid-cols-2 dark:bg-white dark:text-black">
                    <TabsTrigger value="interviewers">AVATARS</TabsTrigger>
                    <TabsTrigger value="description">DESCRIPTION</TabsTrigger>
                  </TabsList>
                  <TabsContent value="interviewers">
                    <Card className="w-[600px] dark:bg-white">
                      <CardHeader>
                        <CardTitle>Interviewers</CardTitle>
                        <CardDescription>
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
                            <RadioGroupItem
                              value="CYw3kZ02Hs0563khs1Fj"
                              id="r1"
                            />
                            <Label htmlFor="r1">Dave - IBM</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="21m00Tcm4TlvDq8ikWAM"
                              id="r2"
                            />
                            <Label htmlFor="r2">Rachel- TSMC</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="bVMeCyTHy58xNoL34h3p"
                              id="r3"
                            />
                            <Label htmlFor="r3">Jeremy - Google</Label>
                          </div>
                        </RadioGroup>
                      </CardContent>
                      <CardFooter>
                        <Button
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
                    <Card className="w-[600px] dark:bg-white dark:text-white">
                      <CardHeader>
                        <CardTitle>Description</CardTitle>
                        <CardDescription>Select Your Job Role.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <RadioGroup
                          onValueChange={(value) => {
                            setIvdata({ ...ivdata, role: value })
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Web Developer" id="r1" />
                            <Label htmlFor="r1">Web Developer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Software Engineer" id="r2" />
                            <Label htmlFor="r2">Software Engineer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Business Executive"
                              id="r3"
                            />
                            <Label htmlFor="r3">Business Executive</Label>
                          </div>
                        </RadioGroup>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="me-2"
                          onClick={() => {
                            setTab("interviewers")
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => {
                            setStart(true)
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
                  className="w-[600px] dark:bg-white dark:text-white"
                >
                  <TabsList className="grid w-full grid-cols-2 dark:bg-white dark:text-black">
                    <TabsTrigger value="previous">LAST SCORE</TabsTrigger>
                    <TabsTrigger value="past">PAST RECORDS</TabsTrigger>
                  </TabsList>
                  <TabsContent value="previous">
                    <Card className="w-[600px] dark:bg-white">
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
                    <Card className="w-[600px] dark:bg-white dark:text-white">
                      <CardHeader>
                        <CardTitle>All Records</CardTitle>
                        <CardDescription>
                          Details of Previous record.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          31/07/2023 01:10PM Nice work but need to change
                          Accent.
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
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="w-50 flex-auto rounded border border-slate-600">
                  AI
                </div>
                <div className="w-50 flex-auto rounded border border-slate-600">
                  user
                </div>
              </div>
              <div className="w-95 space-x-4 rounded-full">
                <Button>microphone</Button>
              </div>
              <div className="w-95 space-x-4 rounded border border-slate-600">
                <Accordion type="single" collapsible className="p-3">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Transcript</AccordionTrigger>
                    <AccordionContent>How are you?</AccordionContent>
                    <AccordionContent>
                      I am doing fine. How you doing sir.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </>
          )}
        </>
      </main>
    </>
  )
}
