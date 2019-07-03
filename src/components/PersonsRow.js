import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { CardItem, Card, Body } from 'native-base';
import constants from '../helpers/constants';

export default function PersonsRow({ item }) {
    return (
        <Card>
            <CardItem>
                <Body style={styles.rowContainer}>
                    <View>
                        {item.images ? (
                            <Image
                                style={{ width: 75, height: 75 }}
                                source={{
                                    uri: `https://dev.search.connectourkids.org/api/thumbnail?tokens=${
                                        item.images[0].thumbnail_token
                                        }`
                                }}
                            />
                        ) : (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{
                                        uri:
                                            'https://dev.search.connectourkids.org/api/thumbnail?tokens=AE2861B20B7D6E22D4C9479C5C7387EF9C9CE823D35EABEA7AAFCEB4822D4BE6583BC7DC98D6B5210198C7212B2FD214763272C79F7CA63BE2B8506D2169603090E8B141709B04C80F39BCBFCEC9A282A7BB8F0DB3884DA83EF83FC8D75468D8BDBEB02A142C066F83F3FB82506B407FF8717CEA9C9FE6473138E1E10283F5B34F24AB776656BB6E1313E2142E,AE2861B242686E6ACBCD539D133B8AE59A9AE962DB1FA5AA7AF08DAFDE6D0BF11B678C83D9CDB2322ADF85744B699B543C4E5FE3AC5A925CD38B745A094D5664F48F947358B57DB95E4CE5EB,AE2861B242686E7ECDCD579C5E7398F2969BED6CDD1FA5AA7AF0D1FE8B3458E6423ED4D29392B83E30DC92630078860B351A45E7F10CCF489AD6221B511A0E6AEA99913457E825E95259E5EE91B4BDE2EF92EA61A8F712DE67821AEF8B2C64D1B596E1425E4E38518D98DFA901537D7DF60237AFCCA1CE0D667DB4F445C9'
                                    }}
                                />
                            )}
                        {item.names ? (
                            <Text style={styles.nameText}>{item.names[0].display}</Text>
                        ) : null}
                        {item.dob ? <Text>{item.dob.display}</Text> : null}
                        {item.gender ? <Text>{item.gender.content}</Text> : null}
                        {item.addresses
                            ? item.addresses.map(address => {
                                return (
                                    <Text>
                                        {address.city} , {address.state}
                                    </Text>
                                );
                            })
                            : null}
                        {item.usernames
                            ? item.usernames.map(user => {
                                return <Text>{user.usernames}</Text>;
                            })
                            : null}
                        {item.url ?
                            item.url.map(url => {
                                return (
                                    <Text>{url.usernames}</Text>
                                )
                            })
                            : null}
                    </View>
                </Body>
            </CardItem>
        </Card>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row'
    },
    rowImage: {
        marginRight: 10,
        width: 75,
        height: 75
    },
    nameText: {
        fontSize: 20,
        color: '#508DB3',
        fontFamily: constants.fontFamily,
        marginBottom: 5
    },
    informationText: {
        fontFamily: constants.fontFamily,
        fontSize: 14
    }
});
