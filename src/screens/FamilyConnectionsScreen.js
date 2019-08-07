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
  ScrollView
} from 'react-native';
import { ListItem, Image } from "react-native-elements";
import { Picker } from 'react-native-picker-dropdown';

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
// import axios from 'axios';
// import { wrap } from 'module';


// Image info + list details
const list = [
  {
    name: 'Amy Foyier',
    avatar_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2JhY2M2Y2QtZDBjOS00MjY2LWJhMjEtZWNjNTQ3MTE0YzBlXkEyXkFqcGdeQXVyNjE5MDgzMjI@._V1_UY256_CR10,0,172,256_AL_.jpg',
  },
  {
    name: 'Chris James',
    avatar_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA0Mzg2NzEwNF5BMl5BanBnXkFtZTcwMTI0NTgwMw@@._V1_UY256_CR32,0,172,256_AL_.jpg',
  },
  {
    name: 'Amy Foyier',
    avatar_url: 'https://images.pexels.com/photos/264614/pexels-photo-264614.jpeg?h=350&auto=compress&cs=tinysrgb',
  },
  {
    name: 'Chris James',
    avatar_url: 'https://pbs.twimg.com/profile_images/1140853173533364225/hfR7VSqB.png',
  },
  {
    name: 'Amy Foyier',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: 'Chris James',
    avatar_url: 'https://pbs.twimg.com/profile_images/1054041762858070023/nmkvCzs6.jpg',
  },
  {
    name: 'Chris James',
    avatar_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4NTM1MTExOF5BMl5BanBnXkFtZTcwMTYwODMyMw@@._V1_UY256_CR2,0,172,256_AL_.jpg',
  },
  {
    name: 'Amy Foyier',
    avatar_url: 'https://images.pexels.com/photos/413723/pexels-photo-413723.jpeg?h=350&auto=compress&cs=tinysrgb',
  },
  {
    name: 'Chris James',
    avatar_url: 'https://pbs.twimg.com/profile_images/1108443816565059590/Te-0H20q.png',
  },
  {
    name: 'Chris James',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
]
// console.log(list.length)

class FamilyConnectionsScreen extends Component {
    static navigationOptions = ({ navigation }) =>
      headerConfig('Family Connections', navigation);
        constructor(props) {
          super(props);
          this.state = {
            keywords: 'Search',
            gender: "Gender",
            ageRange: "Age Range",
            sortBy: "Sort By",
            }
        }

handleGenderChange = (gender) => {
  this.setState({ gender })
  console.log(this.state.gender);
}

handleAgeChange = (ageRange) => {
  this.setState({ ageRange })
  console.log(this.state.ageRange);
}

handleSortChange = (sortBy) => {
  this.setState({ sortBy })
  console.log(this.state.sortBy);
}

render() {
  // const { navigation } = this.props;
  return (
    <View>
      <View style={{ flexDirection: "row"}}>
        <TextInput style={styles.inputs} placeholder="Search Keywords..." placeholderTextColor = "black"/>

        {/* Gender Dropdown */}
          <Picker
            style={styles.gender}
            selectedValue={this.state.gender}
            onValueChange={this.handleGenderChange}
            mode="dialog"
            textStyle={styles.pickerText}
          >
            <Picker.Item label="Gender" value="Gender" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
          </Picker>

        {/* Age Range Dropdown */}
          <Picker
            style={styles.age}
            selectedValue={this.state.ageRange}
            onValueChange={this.handleAgeChange}
            mode="dialog"
            textStyle={styles.pickerText}
          >
            <Picker.Item label="Age Range" value="Age Range" />
            <Picker.Item label="0-5" value="0-5" />
            <Picker.Item label="6-12" value="6-12" />
            <Picker.Item label="13-17" value="13-17" />
          </Picker>

          {/* Sort By Dropdown */}
          <Picker
            style={styles.sort}
            selectedValue={this.state.sortBy}
            onValueChange={this.handleSortChange}
            mode="dialog"
            textStyle={styles.pickerText}
          >
            <Picker.Item label="Sort By" value="Sort By" />
            <Picker.Item label="Recent" value="recent" />
            <Picker.Item label="A-Z" value="a-z" />
            <Picker.Item label="Z-A" value="z-a" />
          </Picker>
        </View>


        {/* Case List Todos:
        Get the full {list.name} lengths appearing */}

        {/* Case List  */}
        <View>
          <ScrollView contentContainerStyle={styles.parentList}>
            {
              list.map((list, index) => (
                <ListItem 
                  style={styles.item}
                  key={index}
                  onPress={() => console.log(`${list.name} Pressed!`)}
                  activeOpacity={0.85}
                  subtitle={
                  // Todos:
                  // Create NewConnection Screen - Navigation Options

                  // onPress={() => navigation.navigate('NewConnection')}
                  
                    <View>
                      <Image 
                        source={{ uri: list.avatar_url }}
                        style={{ width: 104, height: 104 }}
                        borderRadius={4}
                        PlaceholderContent={
                          <ActivityIndicator />
                        } 
                      />
                      <Text style={styles.listName}>{list.name}</Text>
                    </View>
                    }
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

// Todos: 
    // Create styles that target android platform

    // const listItems = Platform.select({
    //   android: {  },
    //   ios: {  },
    // });

const styles = StyleSheet.create({
  parentList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 160,
  },
  item: {
    width: "32%",
  },
  listName: {
    paddingTop: 10,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },
  inputs: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 6,
    width: 115,
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
    fontSize: 11,
  },
  gender: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 6,
    width: 75,
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
    fontSize: 11
  },
  age: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 6,
    width: 95,
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
    fontSize: 11
  },
  sort: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 6,
    width: 75,
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
    fontSize: 11
  },
  caseList: {
    margin: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default FamilyConnectionsScreen;








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
