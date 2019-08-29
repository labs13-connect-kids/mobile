import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableHighlight,
  Alert
} from 'react-native';
import axios from 'axios';
import { ListItem, Image, SearchBar, Button, CheckBox, Divider } from "react-native-elements";
// import { Picker } from 'react-native-picker-dropdown';
import constants from '../helpers/constants';

class FamilyConnectionsScreen extends Component {
    static navigationOptions = ({ navigation }) =>
      headerConfig('Family Connections', navigation);
        constructor(props) {
          super(props);
          this.state = {
            searchKeywords: '',
            gender: "Gender",
            ageRange: "Age Range",
            sortBy: "Sort By",
            results: [],
            isLoading: true,
            modalVisible: false,
            checked: false,
            caseVisible: false,
            }
        }

setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

setCaseVisible(visible) {
  this.setState({ caseVisible: visible })
}

handleKeywordChange = event => {
  this.setState({ 
    searchKeywords: event,
  })
  console.log(this.state.searchKeywords);
};

getUserCases() {
  // getUserCases Todos:
  // store token in secure location
  const token;
   axios.get('http://api.demo.connectourkids.org/v1/cases/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    this.setState({
      results: response.data.results,
      isLoading: false,
    })
  })
  .catch(error => {
    console.log(error);
  });
}

componentDidMount() {
  this.getUserCases();
}

render() {
  // Searchbar functionality - filters by case first_name or last_name
  let filteredCases = this.state.results.filter(
    (result) => {
      return result.full_name.indexOf(this.state.searchKeywords) 
        != -1;
    }
  );

  // const { navigate } = this.props.navigation;
  const fullYear = new Date();

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row" }}>
          <SearchBar 
            placeholder="Search Keywords..." 
            placeholderTextColor="black"
            lightTheme 
            round
            name="searchKeywords"
            value={this.state.searchKeywords}
            onChangeText={this.handleKeywordChange}
            // create searchbar target platform.os
            platform="ios"
            containerStyle={styles.searchBar}
          />

          <Button
            title="Filters"
            buttonStyle={{ backgroundColor: constants.highlightColor }}
            containerStyle={styles.filterButton} 
            onPress={() => {
              this.setModalVisible(true);
            }}
          />
        </View>


      {/* Filters Button - onPress Modal */}
      <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          // onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          // }}
        >

        <ScrollView>
          <View style={{ marginVertical: 100, justifyContent:"space-evenly", alignSelf: "center" }}>
              
            <Text style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}>
              Gender
            </Text>

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Male'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Female'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Unspecified'
              size={16}
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />

            <Divider style={{ height: 1, backgroundColor: 'lightgray', margin: 20 }} />

            <Text style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}>
              Age Range
            </Text>

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='0 - 5 years'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='6 - 9 years'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='10 - 13 years'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='14 - 18 years'
              size={16}
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            
            <Divider style={{ height: 1, backgroundColor: 'lightgray', margin: 20 }} />

            <Text style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}>
              Sort By
            </Text>

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Name'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Date of Birth'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Created'
              size={16}
              checked={this.state.checked}
            />

            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Updated'
              size={16}
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />
          </View>
        </ScrollView>
        <View style={{ alignContent: "center", marginVertical: 60, marginHorizontal: 30, fontSize: 80, fontWeight: "bold", paddingTop: -10 }}>
          <TouchableHighlight>
            <Button
              buttonStyle={{ backgroundColor: constants.highlightColor }} 
              title="Apply Filters" 
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            />
          </TouchableHighlight>
        </View>
        </Modal>

      

      {/* Case List Todos:
       Cache case info from API for faster loading */}

      {/* Case List View Starts Here */}
      <View style={{ paddingBottom: 170 }}>
        <ScrollView>

          {/* Displays text placeholder until cases load */}
          { (this.state.isLoading === true) ? 
            <Text style={styles.isLoading}> Loading Cases... </Text>
              :
              filteredCases.map((result, index) => (
              
                <ListItem
                  key={index}
                  title={result.full_name}
                  titleStyle={{ color: '#5A6064' }}
                  subtitle={`${(result.gender && result.birthday) && (!null || '') ? `Gender: ${result.gender} , ${(fullYear.getFullYear() - result.birthday.slice(0,4)) } years old` : 'unspecified' }`}
                  subtitleStyle={{ color: '#9FABB3' }}
                  leftAvatar={{ source: { uri: result.picture }}}
                  topDivider={true}
                  onPress={() => this.setCaseVisible(true)}

                  // Case badges for document value/count
                  badge={{ value: result.count_documents, textStyle: { fontSize: 14, color: 'white', backgroundColor: constants.highlightColor }, containerStyle: {  marginTop: -10 } }}
                />
            ))
          }

          {/* Case onPress Modal */}
          <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.caseVisible}
            >
            <View style={{ marginVertical: 200, justifyContent: "center", alignItems: "center" }}>
              <Text>Working on it... </Text>

              <TouchableHighlight
                underlayColor="lightgray"
                onPress={() => {
                  this.setCaseVisible(false);
                  }}
              >
              <Text>Close Modal</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
    )
  }
}

// Todos: 
// Create styles that target both platforms

const styles = StyleSheet.create({
 searchBar : {
  marginHorizontal: Platform.OS === 'ios' ? 5 : 5,
  width: Platform.OS === 'ios' ? 285 : 320,
  backgroundColor: Platform.OS === 'ios' ? 'white' : 'white'
 },
 filterButton : {
  width: Platform.OS === 'ios' ? 70 : 70,
  marginVertical: Platform.OS === 'ios' ? 20 : 20 ,
  maxHeight: Platform.OS === 'ios' ? 40 : 40 ,
 },
  isLoading: {
    textAlign: "center",
    fontSize: 20,
    flex: 1,
    marginTop: 240,
    color: "black"
  },
});

export default FamilyConnectionsScreen;



// import { Button } from 'native-base';
// import { ScrollView } from 'react-native-gesture-handler';
// import { connect } from 'react-redux';
// import headerConfig from '../helpers/headerConfig';
// import { sendEvent } from './../helpers/createEvent';
// import FamilyConnectionsModal from './../components/FamilyConnectionsModal/FamilyConnectionsModal';
// import Video from '../components/Video/Video';
// import constants from '../helpers/constants';
// import MainText from '../UI/MainText';
// import ScreenContainer from '../UI/ScreenContainer';
// import { wrap } from 'module';

// class FamilyConnectionsScreen extends Component {
//   static navigationOptions = ({ navigation }) =>
//     headerConfig('Family Connections', navigation);

//   state = {
//     modalVisible: false,
//     message: false,
//     email: ''
//   };

//   openModal = () => {
//     this.setState({
//       modalVisible: true
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modalVisible: false
//     });
//   };

//   trackInterest = trackingEmail => {
//     let email = this.props.email ? this.props.email : trackingEmail;
//     sendEvent(email, 'click', 'request-familyconnections');
//     this.setState({
//       modalVisible: false,
//       email,
//       message: true
//     });
//     this.startClearState();
//   };

//   startClearState = () => {
//     setTimeout(() => {
//       this.setState({ message: false, email: '' });
//     }, 3000);
//   };

//   render() {
//     return (
//       <ScreenContainer>
//         <SafeAreaView>
//           <StatusBar barStyle="dark-content" />
//           <View>
//             <Modal
//               animationType="slide"
//               transparent={false}
//               visible={this.state.modalVisible}
//               onRequestClose={this.closeModal}
//             >
//               <FamilyConnectionsModal
//                 trackInterest={this.trackInterest}
//                 closeModal={this.closeModal}
//                 startRegister={this.startRegister}
//                 email={this.props.email}
//               />
//             </Modal>
//           </View>
//           <ScrollView>
//             <MainText>
//               Learn about a revolutionary way to discover and engage extended
//               families for at-risk foster youth.
//             </MainText>

//             <Video uri={constants.familyConnectionsURI} />

//             <Button style={styles.button} block onPress={this.openModal}>
//               <Text style={styles.buttonText}>
//                 I Want To Access Family Connections
//               </Text>
//             </Button>

//             {this.state.message && (
//               <View style={styles.messageContainer}>
//                 <Text style={styles.thankyouMessage}>
//                   Thank you for showing interest, {this.state.email} has been
//                   added to our list.
//                 </Text>
//               </View>
//             )}
//           </ScrollView>
//         </SafeAreaView>
//       </ScreenContainer>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     backgroundColor: constants.highlightColor
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '700'
//   },
//   loginContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   videoContainer: { height: 300, marginBottom: 30 },
//   thankyouMessage: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     textTransform: 'uppercase'
//   },
//   messageContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: constants.highlightColor,
//     borderRadius: 5
//   }
// });

// const mapStateToProps = state => {
//   return {
//     email: state.auth.user ? state.auth.user.email : null
//   };
// };

// export default connect(mapStateToProps)(FamilyConnectionsScreen);