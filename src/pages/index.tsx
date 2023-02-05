import Head from "next/head";
import Account from "../../components/Account";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Login System</title>
        <meta
          name="description"
          content="A login system with next and supabase"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container" style={{ padding: "50px 0 100px 0" }}>
          {!session ? (
            <div className="login">
              <button className="button block" onClick={onOpen}>
                Login
              </button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    <Text fontSize="2xl" color="black">
                      LOGIN
                    </Text>
                  </ModalHeader>
                  <ModalCloseButton backgroundColor="black" />
                  <ModalBody>
                    <Auth
                      providers={["google"]}
                      supabaseClient={supabase}
                      appearance={{ theme: ThemeSupa }}
                      theme={"light"}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <p>Powered by Supabase</p>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <Account session={session} />
          )}
        </div>
      </main>
    </>
  );
}
