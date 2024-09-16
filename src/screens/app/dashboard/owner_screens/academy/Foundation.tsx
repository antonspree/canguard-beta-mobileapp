import React, { useEffect } from "react";
import { View } from "react-native";
import Container from "@/components/Container";
import Text from "@/elements/Text";
import WebView from "react-native-webview";

const FoundationScreen = () => {
  let videoWebViewRef1: any = null;
  let videoWebViewRef2: any = null;

  useEffect(() => {
    const jsCode = `document.querySelector("video").pause()`;
    if (videoWebViewRef1) {
      videoWebViewRef1.injectJavaScript(jsCode);
    }
    if (videoWebViewRef2) {
      videoWebViewRef2.injectJavaScript(jsCode);
    }
  }, []);

  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <Text variant="titleSmall" className="mb-2">
              Founding your Cannabis Social Club
            </Text>
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              Welcome to Chapter 1 of our CanSult Academy, where you can expect
              new videos every week on the topic of founding a company and the
              first steps in your cannabis social club.
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="w-[240px] h-[180px] bg-gray-200 mb-4 rounded-lg overflow-hidden">
              <WebView
                mediaPlaybackRequiresUserAction={false}
                ref={(ref) => (videoWebViewRef1 = ref)}
                source={{
                  uri: "https://www.youtube.com/embed/W3Edcv89TVs?rel=0",
                }}
                style={{
                  width: 240,
                  height: 180,
                  backgroundColor: "#000",
                }}
              />
            </View>
            <View>
              <Text variant="titleSmall" className="mb-2">
                Welcome to CanSult Academy
              </Text>
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                We are pleased to finally present our CanSult Academy to you.
                Good luck!
              </Text>
            </View>
          </View>
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="w-[240px] h-[180px] bg-gray-200 mb-4 rounded-lg overflow-hidden">
              <WebView
                mediaPlaybackRequiresUserAction={false}
                ref={(ref) => (videoWebViewRef2 = ref)}
                source={{
                  uri: "https://www.youtube.com/embed/9hzUMJU9e04?rel=0",
                }}
                style={{
                  width: 240,
                  height: 180,
                  backgroundColor: "#000",
                }}
              />
            </View>
            <View>
              <Text variant="titleSmall" className="mb-2">
                Establishment of an eV
              </Text>
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                The basic requirement for your cannabis social club is to be a
                registered association. Lennart tells you what you need to pay
                attention to.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default FoundationScreen;
