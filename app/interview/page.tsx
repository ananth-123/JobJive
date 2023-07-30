"use client"

import { useState } from "react"

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
  const [start, setStart] = useState(false)
  return (
    <>
      <main className="m-5 space-x-4 space-y-4">
        <>
          {start == false ? (
            <>
              <div className="flex justify-center">
                <Tabs value={tab} className="w-[600px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="interviewers">AVATARS</TabsTrigger>
                    <TabsTrigger value="description">DESCRIPTION</TabsTrigger>
                  </TabsList>
                  <TabsContent value="interviewers">
                    <Card>
                      <CardHeader>
                        <CardTitle>Interviewers</CardTitle>
                        <CardDescription>
                          Select your Interviewers based on your need.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <RadioGroup defaultValue="rachel">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rachel" id="r1" />
                            <Label htmlFor="r1">Rachel - IBM</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yim Yong" id="r2" />
                            <Label htmlFor="r2">Yim Yong - TSMC</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Balayya" id="r3" />
                            <Label htmlFor="r3">Balayya - Google</Label>
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
                    <Card>
                      <CardHeader>
                        <CardTitle>Description</CardTitle>
                        <CardDescription>
                          Description about your scenario.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid w-full gap-2">
                          <Textarea placeholder="Type your message here." />
                          <Button>Set the Scenario</Button>
                        </div>
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
                          Done
                        </Button>
                      </CardFooter>
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
