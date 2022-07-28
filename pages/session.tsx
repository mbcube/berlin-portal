import { IJitsiMeetingProps } from "@jitsi/react-sdk/lib/types";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { FC } from "react";
import { useUserData } from "../lib/hooks";

const JitsiMeeting = dynamic(
  () =>
    import("@jitsi/react-sdk").then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  }
) as FC<IJitsiMeetingProps>;

export default function Session() {
  const router = useRouter();
  const user = useUserData();

  return !router.query.id ? (
    <ErrorPage statusCode={404} />
  ) : (
    <>
      <JitsiMeeting
        roomName={router.query.id as string}
        userInfo={{
          displayName: user?.displayName || "",
          email: user?.email || "",
        }}
        configOverwrite={{
          disableModeratorIndicator: true,
          hideAddRoomButton: true,
          enableWelcomePage: false,
          disableSelfViewSettings: true,
          prejoinConfig: {
            enabled: true,
            hideDisplayName: true,
            hideExtraJoinButtons: ["no-audio"],
          },
          participantsPane: {
            hideModeratorSettingsTab: true,
            hideMoreActionsButton: true,
            hideMuteAllButton: true,
          },
          breakoutRooms: {
            hideAddRoomButton: true,
            hideAutoAssignButton: true,
            hideJoinRoomButton: true,
          },
        }}
        getIFrameRef={(node) => (node.style.height = "800px")}
      />
    </>
  );
}
