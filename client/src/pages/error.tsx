import { Button, Center, Image, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Error404 from "../assets/404.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();

  const onReturnOnClicked = () => {
    navigate(-1);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          width: "70%",
          height: "90vh",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          radius="md"
          src={Error404}
          alt="Random unsplash image"
          caption={
            <>
              <Text size="md" weight={500}>
                Error 404! Not Found
              </Text>
              <Center>
                <Button
                  variant="filled"
                  color="blue"
                  onClick={onReturnOnClicked}
                >
                  Quay lại
                </Button>
              </Center>
            </>
          }
        />
      </div>
    </motion.div>
  );
};

export default ErrorPage;
