import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck, Clock, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ScheduledMeetingList({ meetingList }: any) {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting: any, index: any) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{meeting?.eventName}</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="mt-5 flex flex-col gap-4">
                    <h2 className="flex gap-2">
                      <Clock />
                      {meeting?.duration} Min{" "}
                    </h2>
                    <h2 className="flex gap-2">
                      <CalendarCheck />
                      {new Date(meeting.date.toDate()).toLocaleDateString()}{" "}
                    </h2>
                    <h2 className="flex gap-2">
                      <Timer />
                      {meeting.time}{" "}
                    </h2>
                  </div>
                  <Link href={meeting.locationUrl}>
                    <Button className="mt-5">Join Now</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}

export default ScheduledMeetingList;