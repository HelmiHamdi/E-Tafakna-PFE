
import { Box,Typography} from "@mui/material";

import Header from "../../components/Header/Header";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import ChatSection from "./ChatSection";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
 
 
  const { currentUser } = useContext(AuthContext);
  let [searchParams, setSearchParams] = useSearchParams();

  const { data: loyers } = useSWR(
    `http://localhost:8800/api/loyers/getLoyers`,
    fetcher
  );
  const { data: chats } = useSWR(
    `http://localhost:8800/api/chat/` + currentUser.id,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  console.log(chats);

  return (
    <Box m="20px" mt="-30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CHAT" subtitle="Welcome to your chatRoom " />
      </Box>
      <Box display="flex" height="calc(115vh - 250px)">
        <Box
          width={250}
          borderRight="1px solid"
          padding={2}
          height="100%"
          overflow="auto"
        >
          {chats
            ?.filter(
              (chat) =>
                !chats.find(
                  (c) =>
                    ((c.sender === chat.sender &&
                      c.receiver === chat.receiver) ||
                      (c.sender === chat.receiver &&
                        c.receiver === chat.sender)) &&
                    chat.createdAt < c.createdAt
                )
            )
            ?.map((chat) => {
              const loyer = loyers?.find(
                (loyer) =>
                  loyer.id ==
                  (chat.sender === currentUser.id ? chat.receiver : chat.sender)
              );
              return (
                <Box
                  key={chat.id}
                  marginBlock={1}
                  display="flex"
                  gap={1}
                  onClick={() =>
                    setSearchParams({
                      loyer:
                        chat.sender === currentUser.id
                          ? chat.receiver
                          : chat.sender,
                    })
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    src={loyer?.picture}
                    alt="profile"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {loyer.name} {loyer.last_names}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {chat.sender === currentUser.id && "You: "}
                      {chat.message}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Box flex={1} height="100%">
          <ChatSection />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
