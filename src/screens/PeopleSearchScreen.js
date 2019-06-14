import React from "react";
import axios from "axios";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput
} from "react-native";

import {
    Container,
    Content,
    Button,
    Icon,
    H2,
    Tabs,
    Tab,
    Input
} from "native-base";

import logoImg from "../../assets/simple-logo.png";

import { ScrollView, FlatList } from "react-native-gesture-handler";

import PersonsRow from "../components/PersonsRow";
// import HeaderTitle from "./../components/HeaderTitle";
import headerConfig from "../helpers/headerConfig";
import ChangeTabs from '../components/ChangeTabs';
class PeopleSearchScreen extends React.Component {
    static navigationOptions = ({ navigation }) =>
        headerConfig("People Search", navigation);
    state = {
        name: "",
        cityState: "",
        address: "",
        phone: "",
        url: "",
        email: "",
        isDisplaying: false,
        possiblePersons: []
    };
    inputHandler = (name, value) => {
        this.setState({ [name]: value });
    };

    handleEncodeURI = () => {
        const person = {};
        if (this.state.name.length) {
            person.names = [];
            let splitName = this.state.name.split(" ");
            if (splitName.length === 2) {
                person.names.push({ first: splitName[0], last: splitName[1] });
            } else if (splitName.length === 3) {
                person.names.push({
                    first: splitName[0],
                    middle: splitName[1],
                    last: splitName[2]
                });
            }
        }

        const inputData = {
            person: {
                names: [
                    {
                        first: `Ken`,
                        middle: "Joseph",
                        last: "Kent",
                        display: "Clark Joseph Kent"
                    }
                ],
                emails: [
                    {
                        address: "clark.kent@example.com"
                    }
                ],
                phones: [
                    {
                        "@type": "home_phone",
                        country_code: "1",
                        number: "9785550145",
                        display: "(978) 555-0145",
                        display_international: "+1 978-555-0145"
                    }
                ],
                addresses: [
                    {
                        country: "US",
                        state: "KS",
                        city: "Smallville",
                        street: "Hickory Lane",
                        house: "10",
                        apartment: "1",
                        zip_code: "66605",
                        display: "10-1 Hickory Lane, Smallville, Kansas"
                    },
                    {
                        "@type": "work",
                        country: "US",
                        state: "KS",
                        city: "Metropolis",
                        street: "Broadway",
                        house: "1000",
                        apartment: "355",
                        display: "1000-355 Broadway, Metropolis, Kansas"
                    }
                ],
                urls: [
                    {
                        "@domain": "linkedin.com",
                        "@category": "professional_and_business",
                        url: "https://www.linkedin.com/pub/superman/20/7a/365"
                    },
                    {
                        "@domain": "facebook.com",
                        "@category": "personal_profiles",
                        url: "https://www.facebook.com/superman"
                    }
                ]
            }
        };
        console.log(
            JSON.stringify({
                person: encodeURI(JSON.stringify(person))
            })
        );
        return JSON.stringify({
            person: encodeURI(JSON.stringify(person))
        });
    };

    handlePersonSubmit = () => {
        const body = this.handleEncodeURI();
        axios
            .post("https://dev.search.connectourkids.org/api/search-v2", body)
            .then(res =>
                this.setState({ possiblePersons: res.data.possible_persons })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Text style={styles.intro}>Search By:</Text>
                        </View>

                        <View>
                            <ChangeTabs
                                name={this.state.name}
                                cityState={this.state.cityState}
                                email={this.state.email}
                                address={this.state.address}
                                phone={this.state.phone}
                                url={this.state.url}
                                inputHandler={this.inputHandler}
                                handlePersonSubmit={this.handlePersonSubmit}
                            />

                            <Text style={styles.link}>
                                This is a preview. Social workers can have completely free
                                access. Click here to find out more.
              </Text>
                            {this.state.isDisplaying && <Text>{this.state.name}</Text>}

                            {this.state.possiblePersons.length ? (
                                <FlatList
                                    data={this.state.possiblePersons}
                                    renderItem={({ item }) => {
                                        return <PersonsRow item={item} />;
                                    }}
                                    keyExtractor={possiblePersons => Math.random()}
                                />
                            ) : null}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 5
    },

    header: {
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "space-between",
        marginBottom: 25
    },

    intro: {
        padding: 10,
        fontSize: 15
    },

    textInput: {
        borderColor: "#64aab8",
        borderWidth: 1,
        borderStyle: "solid",
        flex: 2
    },

    textInputSmall: {
        flex: 1
    },
    nameInput: {
        flexDirection: "row"
    },

    button: {
        margin: 10,
        padding: 10
    },

    tab: {
        backgroundColor: "white"
    },

    buttonText: {
        color: "white"
    },

    link: {
        color: "#64aab8",
        lineHeight: 17,
        padding: 15,
        backgroundColor: "rgb(216,236,240)",
        borderRadius: 10
    }
});

export default PeopleSearchScreen;