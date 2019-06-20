import React from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { fetchPerson, fetchSearchResult, resetState } from '../store/actions';

import { Container, Button, Tabs, Tab, Input } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { eventTrack } from '../helpers/eventTracking';

import PersonRow from '../components/Person/PersonRow';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';

class PeopleSearchScreen extends React.Component {
    static navigationOptions = ({ navigation }) =>
        headerConfig('People Search', navigation);
    state = {
        name: '',
        cityState: '',
        email: '',
        address: '',
        phone: '',
        url: '',
        isDisplaying: false,
        possiblePersons: [],
        person: null
    };
    inputHandler = (name, value) => {
        this.setState({ [name]: value });
    };

    handleEncodeURI = () => {
        // const testNamePerson = {
        //   names: [
        //     {
        //       first: `Roxann`,
        //       last: 'Collins'
        //     }
        //   ]
        // };
        const person = {};

        // Name constructor
        if (this.state.name.length) {
            person.names = [];
            let splitName = this.state.name.trim().split(' ');
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
        // City State constructor
        // Right now acccounts for 2 length string City ST or State
        if (this.state.cityState.length) {
            person.addresses = [];
            let splitAddress = this.state.cityState.split(' ');
            if (splitAddress.length === 2) {
                person.addresses.push({
                    state: splitAddress[1],
                    city: splitAddress[0]
                });
            }
        }
        // Email constructor
        if (this.state.email.length) {
            person.emails = [];
            let splitEmail = this.state.email.split(' ');
            if (splitEmail.length === 1) {
                person.emails.push({
                    address: splitEmail[0]
                });
            }
        }

        // Phone constructor
        // Test with 3303303333 format
        if (this.state.phone.length) {
            person.phones = [];
            let splitPhone = this.state.phone.split(' ');
            if (splitPhone.length === 1) {
                person.phones.push({
                    number: splitPhone[0]
                });
            }
        }

        // Url constructor
        // Test with https://twitter.com/elonmusk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor
        if (this.state.url.length > 0) {
            person.urls = [];
            let splitUrl = this.state.url.split(' ');
            if (splitUrl.length === 1) {
                person.urls.push({
                    url: splitUrl[0]
                });
            }
        }

        const inputData = {
            person: {
                names: [
                    {
                        first: `Ken`,
                        middle: 'Joseph',
                        last: 'Kent',
                        display: 'Clark Joseph Kent'
                    }
                ],
                emails: [
                    {
                        address: 'clark.kent@example.com'
                    }
                ],
                phones: [
                    {
                        '@type': 'home_phone',
                        country_code: '1',
                        number: '9785550145',
                        display: '(978) 555-0145',
                        display_international: '+1 978-555-0145'
                    }
                ],
                addresses: [
                    {
                        country: 'US',
                        state: 'KS',
                        city: 'Smallville',
                        street: 'Hickory Lane',
                        house: '10',
                        apartment: '1',
                        zip_code: '66605',
                        display: '10-1 Hickory Lane, Smallville, Kansas'
                    },
                    {
                        '@type': 'work',
                        country: 'US',
                        state: 'KS',
                        city: 'Metropolis',
                        street: 'Broadway',
                        house: '1000',
                        apartment: '355',
                        display: '1000-355 Broadway, Metropolis, Kansas'
                    }
                ],
                urls: [
                    {
                        '@domain': 'linkedin.com',
                        '@category': 'professional_and_business',
                        url: 'https://www.linkedin.com/pub/superman/20/7a/365'
                    },
                    {
                        '@domain': 'facebook.com',
                        '@category': 'personal_profiles',
                        url: 'https://www.facebook.com/superman'
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
            .post( constants.devURL, body )
            .then( res => {
                console.log( 'res data from place' , res.data );
                this.setState({ possiblePersons: res.data.possible_persons });
            })
            .catch( err => console.log( err ));
    };

    createEvent = ( success ) => {
        let emailAddress;
        const options = { possibleMatches: this.state.possiblePersons.length , personMatch: this.state.possiblePersons.length === 0 ? true : false }
        if ( !this.props.user ) {
            emailAddress = 'anonymous@unknown.org'
        } else {
            emailAddress = this.props.user.email
        }
        const event = {
            emailAddress,
            event: `person-search-${success}`,
            options
        }
        console.log( 'event:' , event )
        return event;
    }

    handleSearchRequest = () => {
        const { fetchSearchResult, navigation } = this.props;
        const body = this.handleEncodeURI();
        fetchSearchResult(body, () => navigation.navigate('SearchResult') , this.createEvent );
    };

    handleNavigateToResult = async searchPointer => {
        const { person } = this.state;
        if (!person) {
            await this.handlePersonRequest(searchPointer);
        }
        await this.props.navigation.navigate('SearchResult', {
            person: person
        });
    };

    startOver = () => {
        const { resetState } = this.props;
        resetState();
        this.setState({
            name: '',
            cityState: '',
            email: '',
            address: '',
            phone: '',
            url: '',
            isDisplaying: false,
            possiblePersons: []
        });
    };
    
    //ALL ARE 502 status codes
    
    // {event: "search-person-success", emailAddress: "anonymous@unknown.org",…}
    // emailAddress: "anonymous@unknown.org"
    // event: "search-person-success"
    // options: {possibleMatches: 29, personMatch: false}
    
    //SINGLE RETURN
    // {event: "search-person-success", emailAddress: "anonymous@unknown.org",…}
    // emailAddress: "anonymous@unknown.org"
    // event: "search-person-success"
    // options: {possibleMatches: 0, personMatch: true}
    
    //LOGGED IN
    // {event: "search-person-success", emailAddress: "rytwalker@gmail.com",…}
    // emailAddress: "rytwalker@gmail.com"
    // event: "search-person-success"
    // options: {possibleMatches: 30, personMatch: false}

    render() {
        console.log(this.props.navigation);
        return (
            <Container style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Text style={styles.intro}>Search By:</Text>
                        </View>

                        <View>
                            <Tabs
                                style={styles.container}
                                activeTextStyle={{ color: constants.highlightColor }}
                                tabBarUnderlineStyle={{ backgroundColor: '#000' }}
                            >
                                <Tab
                                    heading="Name"
                                    style={[
                                        styles.nameInput,
                                        { color: constants.highlightColor }
                                    ]}
                                    activeTextStyle={{
                                        color: '#000',
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                    textStyle={{
                                        color:
                                            Platform.OS === 'android'
                                                ? '#fff'
                                                : constants.highlightColor,
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                >
                                    <Input
                                        placeholder="First and last, middle optional"
                                        style={styles.textInput}
                                        value={this.state.name}
                                        onChangeText={text => this.inputHandler('name', text)}
                                    />
                                    <Input
                                        placeholder="City, State"
                                        style={[styles.textInput, styles.textInputSmall]}
                                        value={this.state.cityState}
                                        onChangeText={text => this.inputHandler('cityState', text)}
                                    />
                                </Tab>
                                <Tab
                                    heading="Email"
                                    activeTextStyle={{
                                        color: '#000',
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                    textStyle={{
                                        color:
                                            Platform.OS === 'android'
                                                ? '#fff'
                                                : constants.highlightColor,
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                >
                                    <Input
                                        placeholder="Email address"
                                        style={styles.textInput}
                                        value={this.state.email}
                                        onChangeText={text => this.inputHandler('email', text)}
                                    />
                                </Tab>
                                <Tab
                                    heading="Address"
                                    activeTextStyle={{
                                        color: '#000',
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                    textStyle={{
                                        color:
                                            Platform.OS === 'android'
                                                ? '#fff'
                                                : constants.highlightColor,
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                >
                                    <Input
                                        placeholder="Mailing address"
                                        style={styles.textInput}
                                        value={this.state.address}
                                        onChangeText={text => this.inputHandler('address', text)}
                                    />
                                </Tab>
                                <Tab
                                    heading="Phone"
                                    activeTextStyle={{
                                        color: '#000',
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                    textStyle={{
                                        color:
                                            Platform.OS === 'android'
                                                ? '#fff'
                                                : constants.highlightColor,
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                >
                                    <Input
                                        placeholder="Phone any format, no letters"
                                        style={styles.textInput}
                                        value={this.state.phone}
                                        onChangeText={text => this.inputHandler('phone', text)}
                                    />
                                </Tab>
                                <Tab
                                    heading="URL"
                                    activeTextStyle={{
                                        color: '#000',
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                    textStyle={{
                                        color:
                                            Platform.OS === 'android'
                                                ? '#fff'
                                                : constants.highlightColor,
                                        fontFamily: constants.fontFamily,
                                        fontSize: 16
                                    }}
                                >
                                    <Input
                                        placeholder="Social profile link or any URL"
                                        style={styles.textInput}
                                        value={this.state.url}
                                        onChangeText={text => this.inputHandler('url', text)}
                                    />
                                </Tab>
                            </Tabs>

                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    info
                                    style={styles.button}
                                    onPress={this.handleSearchRequest}
                                >
                                    <Text style={styles.buttonText}> Search </Text>
                                </Button>

                                <Button info style={styles.greyButton} onPress={this.startOver}>
                                    <Text style={styles.buttonText}> Start Over </Text>
                                </Button>
                            </View>

                            <Text style={styles.link}>
                                This is a preview. Social workers can have completely free
                                access. Click here to find out more.
                            </Text>
                            {!!this.props.possiblePersons.length ? (
                                <>
                                    <Text style={styles.matchesText}>Possible Matches</Text>
                                    <FlatList
                                        data={this.props.possiblePersons}
                                        renderItem={({ item }) => {
                                            return (
                                                <PersonRow
                                                    item={item}
                                                    handlePress={() =>
                                                        this.props.navigation.navigate('SearchResult', {
                                                            searchPointer: item['@search_pointer_hash']
                                                        })
                                                    }
                                                />
                                            );
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </>
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
        backgroundColor: '#fff',
        margin: 5
    },

    header: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },

    intro: {
        padding: 10,

        fontFamily: constants.fontFamily,
        fontSize: 18
    },

    textInput: {
        borderColor: constants.highlightColor,
        borderWidth: 1,
        borderStyle: 'solid',
        flex: 2
    },

    textInputSmall: {
        flex: 1
    },
    nameInput: {
        flexDirection: 'row'
    },

    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#508DB3'
    },

    tab: {
        backgroundColor: 'white'
    },

    buttonText: {
        color: 'white'
    },

    link: {
        color: '#fff',
        lineHeight: 17,
        padding: 15,
        backgroundColor: constants.highlightColor,
        borderRadius: 10,
        marginBottom: 20
    },
    matchesText: {
        fontSize: 20,
        color: '#508DB3',
        marginBottom: 20
    },

    greyButton: {
        backgroundColor: 'grey',
        margin: 10,
        padding: 10
    }
});

const mapStateToProps = state => {
    const { error, isFetching, person, possiblePersons } = state.people;
    const { user } = state.auth;
    return {
        error,
        isFetching,
        person,
        possiblePersons,
        user
    };
};

export default connect(
    mapStateToProps,
    { fetchPerson, fetchSearchResult, resetState }
)(PeopleSearchScreen);

