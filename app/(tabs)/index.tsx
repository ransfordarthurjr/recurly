import {
    HOME_BALANCE,
    HOME_SUBSCRIPTIONS,
    HOME_USER,
    UPCOMING_SUBSCRIPTIONS,
} from '@/constants/data';
import { icons } from '@/constants/icons';
import images from '@/constants/images';
import '@/global.css';
import { formatCurrency } from '@/lib/utils';
import { styled } from 'nativewind';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import ListHeading from '@/components/ListHeading';
import UpcomingSubscriptionCard from '@/components/UpcomingSubscriptionCard';
import SubscriptionCard from '@/components/SubscriptionCard';
import { useState } from 'react';

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptonId] = useState<
        string | null
    >(null);

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View className="home-header">
                            <View className="home-user">
                                <Image
                                    source={images.avatar}
                                    className="home-avatar"
                                />
                                <Text className="home-user-name">
                                    {HOME_USER.name}
                                </Text>
                            </View>

                            <Image
                                source={icons.add}
                                className="home-add-icon"
                            />
                        </View>

                        <View className="home-balance-card">
                            <Text className="home-balance-label">Balance</Text>

                            <View className="home-balance-row">
                                <Text className="home-balance-amount">
                                    {formatCurrency(HOME_BALANCE.amount, 'USD')}
                                </Text>

                                <Text className="home-balance-date">
                                    {dayjs(HOME_BALANCE.nextRenewalDate).format(
                                        'MM/DD',
                                    )}
                                </Text>
                            </View>
                        </View>

                        <View className="mb-5">
                            <ListHeading title="Upcoming"></ListHeading>

                            <FlatList
                                data={UPCOMING_SUBSCRIPTIONS}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <UpcomingSubscriptionCard {...item} />
                                )}
                                ListEmptyComponent={
                                    <Text className="home-empty-state">
                                        No Upcoming Subscriptions
                                    </Text>
                                }></FlatList>
                        </View>

                        <ListHeading title="All Subscriptions"></ListHeading>
                    </>
                )}
                data={HOME_SUBSCRIPTIONS}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() => {
                            setExpandedSubscriptonId((currentId) =>
                                currentId === item.id ? null : item.id,
                            );
                        }}
                    />
                )}
                extraData={expandedSubscriptionId}
                ItemSeparatorComponent={() => <View className="h-4"></View>}
                ListEmptyComponent={
                    <Text className="home-empty-state">
                        No Subscriptions Yet
                    </Text>
                }
                contentContainerClassName="pb-30"
            />
        </SafeAreaView>
    );
}
