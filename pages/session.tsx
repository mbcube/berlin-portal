import { IJitsiMeetingProps } from "@jitsi/react-sdk/lib/types";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { FC } from "react";

const JitsiMeeting = dynamic(
  () =>
    import("@jitsi/react-sdk").then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  }
) as FC<IJitsiMeetingProps>;

export default function Session() {
  const router = useRouter();

  return !router.query.id ? (
    <ErrorPage statusCode={404} />
  ) : (
    <>
      <JitsiMeeting
        roomName={router.query.id as string}
        getIFrameRef={(node) => (node.style.height = "800px")}
      />
    </>
  );
}
