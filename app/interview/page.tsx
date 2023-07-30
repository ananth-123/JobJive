"use client"
import { useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"

export default async function Page() {
  return (
    <>
      <main className="m-5 space-x-4 space-y-4">
        <div className="flex space-x-4">
          <div className="w-50 flex-auto border border-sky-500">AI</div>
          <div className="w-50 flex-auto border border-sky-500">user</div>
        </div>
        <div className="w-95 space-x-4 border border-sky-500">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Transcript</AccordionTrigger>
              <AccordionContent>How are you?</AccordionContent>
              <AccordionContent>
                I am doing fine. How you doing sir.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </>
  )
}
