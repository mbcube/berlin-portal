import { IJitsiMeetingProps } from "@jitsi/react-sdk/lib/types";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { FC } from "react";
import { useUserData } from "../lib/hooks";
import { UserType } from "../lib/models/user-type.enum";

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
      {user?.userType == UserType.Student && (
        <JitsiMeeting
          roomName={router.query.id as string}
          userInfo={{
            displayName: user?.displayName || "",
            email: user?.email || "",
          }}
          configOverwrite={{
            disableInviteFunctions: true,
            disableModeratorIndicator: true,
            hideAddRoomButton: true,
            enableWelcomePage: false,
            disableSelfViewSettings: true,
            disablePolls: true,

            recordingService: {
              enabled: false,
            },
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
            toolbarButtons: [
              "camera",
              "chat",
              "closedcaptions",
              "feedback",
              "filmstrip",
              "fullscreen",
              "hangup",
              "help",
              "microphone",
              "profile",
              "raisehand",
              "tileview",
              "toggle-camera",
              "__end",
            ],
          }}
          getIFrameRef={(node) => (node.style.height = "800px")}
        />
      )}
      {user?.userType != UserType.Student && (
        <JitsiMeeting
          roomName={router.query.id as string}
          userInfo={{
            displayName: user?.displayName || "",
            email: user?.email || "",
          }}
          getIFrameRef={(node) => (node.style.height = "800px")}
        />
      )}
    </>
  );
}
