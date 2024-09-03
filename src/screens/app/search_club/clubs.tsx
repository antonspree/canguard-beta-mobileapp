import Club from "@/components/Club";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native";
import { useInfiniteQuery } from "react-query";

const ClubList = ({ onFetch }: { onFetch: any }) => {
  const fetch = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const response = await onFetch(pageParam);
    return response;
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "clubs",
    fetch,
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasNextPage ? pages.length + 1 : undefined,
    }
  );

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={data?.pages?.flatMap((page) => page.data.club)}
      renderItem={({ item }) => (
        <View>
          <Club
            clubname={item.clubname}
            badge={item.badge}
            avatar={item.avatar}
            users={item.users}
            maxUser={item.maxUser}
            description={item.description}
            email={item.email}
            phone={item.phone}
            website={item.website}
            instagram={item.instagram}
            discord={item.discord}
            facebook={item.facebook}
            youtube={item.youtube}
            clubID={item.clubID}
            allowRequest={item.allow_request}
          />
        </View>
      )}
      onEndReached={handleEndReached}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
      // other FlatList props
    />
  );
};
export default ClubList;
