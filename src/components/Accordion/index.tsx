import * as React from "react";
import { PropsWithChildren, useState } from "react";
import { LayoutAnimation, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

type AccordionItemProps = PropsWithChildren<{
  title: JSX.Element;
  expanded: boolean;
  onHeaderPress: any;
  [key: string]: any;
}>;

type AccordionData = {
  title: JSX.Element;
  content: JSX.Element;
};

type AccordionProps = PropsWithChildren<{
  data: AccordionData[];
}>;

export function Accordion({
  children,
  title,
  expanded,
  onHeaderPress,
  ...rest
}: AccordionItemProps): JSX.Element {
  const body = <View>{children}</View>;

  const onHeaderPressHandle = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    await onHeaderPress();
  };

  return (
    <View className="pb-1" {...rest}>
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={onHeaderPressHandle}
      >
        <View>{title}</View>
        <Icon
          source={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#bbb"
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

export function AccordionGroup({ data }: AccordionProps): JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleHeaderPress(index: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <>
      {data.map(
        (
          item: {
            title: JSX.Element;
            content: JSX.Element;
          },
          index: number
        ) => (
          <Accordion
            key={index}
            title={item.title}
            expanded={expandedIndex === index}
            onHeaderPress={() => handleHeaderPress(index)}
          >
            {item.content}
          </Accordion>
        )
      )}
    </>
  );
}
