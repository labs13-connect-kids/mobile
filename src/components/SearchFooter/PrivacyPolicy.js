import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import logo from '../../../assets/logoSmall.png';

const PrivacyPolicy = props => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} width={100} />
          </View>
          <TouchableWithoutFeedback onPress={props.closeModal}>
            <Text style={styles.close}>❌</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.text}>
          CONNECT OUR KIDS - PEOPLE SEARCH - ONLINE PRIVACY POLICY AGREEMENT
        </Text>

        <Text style={styles.text}>
          Connect Our Kids LLC, (Connect Our Kids), is committed to keeping any
          and all personal information collected of those individuals that visit
          our website and make use of our online facilities and services
          accurate, confidential, secure and private. Our privacy policy has
          been designed and created to ensure those affiliated with Connect Our
          Kids LLC of our commitment and realization of our obligation not only
          to meet but to exceed most existing privacy standards.
        </Text>

        <Text style={styles.text}>
          THEREFORE, this Privacy Policy Agreement shall apply to Connect Our
          Kids LLC , and thus it shall govern any and all data collection and
          usage thereof. Through the use of search.connectourkids.org you are
          herein consenting to the following data procedures expressed within
          this agreement.
        </Text>

        <Text style={styles.text}>
          Collection of Information This website collects various types of
          information, such as: • Information automatically collected when
          visiting our website, which may include cookies, third party tracking
          technologies and server logs.
        </Text>

        <Text style={styles.text}>
          We may also gather information about the type of browser you are
          using, IP address or type of operating system to assist us in
          providing and maintaining superior quality service.
        </Text>

        <Text style={styles.text}>
          It is highly recommended and suggested that you review the privacy
          policies and statements of any website you choose to use or frequent
          as a means to better understand the way in which other websites
          garner, make use of and share information collected.
        </Text>

        <Text style={styles.text}>
          Use of Information Collected Connect Our Kids LLC may collect and may
          make use of personal information to assist in the operation of our
          website and to ensure delivery of the services you need and request.
          At times, we may find it necessary to use personally identifiable
          information as a means to keep you informed of other possible products
          and/or services that may be available to you from
          Search.connectourkids.org . Connect Our Kids LLC may also be in
          contact with you with regards to completing surveys and/or research
          questionnaires related to your opinion of current or potential future
          services that may be offered.
        </Text>

        <Text style={styles.text}>
          Connect Our Kids LLC does not now, nor will it in the future, sell,
          rent or lease any of our customer lists and/or names to any third
          parties.
        </Text>

        <Text style={styles.text}>
          Connect Our Kids LLC may deem it necessary to follow websites and/or
          pages that our users may frequent in an effort to gleam what types of
          services and/or products may be the most popular to customers or the
          general public.
        </Text>

        <Text style={styles.text}>
          Connect Our Kids LLC may disclose your personal information, without
          prior notice to you, only if required to do so in accordance with
          applicable laws and/or in a good faith belief that such action is
          deemed necessary or is required in an effort to:
        </Text>

        <Text style={styles.text}>
          • Remain in conformance with any decrees, laws and/or statutes or in
          an effort to comply with any process which may be served upon Connect
          Our Kids LLC and/or our website;
        </Text>

        <Text style={styles.text}>
          • Maintain, safeguard and/or preserve all the rights and/or property
          ofC onnect Our Kids LLC; and
        </Text>

        <Text style={styles.text}>
          • Perform under demanding conditions in an effort to safeguard the
          personal safety of users of Search.connectourkids.org and/or the
          general public.
        </Text>

        <Text style={styles.text}>
          Children Under Age of 13 Connect Our Kids LLC does not knowingly
          collect personal identifiable information from children under the age
          of thirteen (13) without verifiable parental consent. If it is
          determined that such information has been inadvertently collected on
          anyone under the age of thirteen (13), we shall immediately take the
          necessary steps to ensure that such information is deleted from our
          system's database. Anyone under the age of thirteen (13) must seek and
          obtain parent or guardian permission to use this website.
        </Text>

        <Text style={styles.text}>
          Unsubscribe or Opt-Out All users and/or visitors to our website have
          the option to discontinue receiving communication from us and/or
          reserve the right to discontinue receiving communications by way of
          email or newsletters. To discontinue or unsubscribe to our website
          please send an email that you wish to unsubscribe to
          Support@connectourkids.org. If you wish to unsubscribe or opt-out from
          any third party websites, you must go to that specific website to
          unsubscribe and/or opt-out.
        </Text>

        <Text style={styles.text}>
          Links to Other Web Sites Our website does contain links to affiliate
          and other websites. Connect Our Kids LLC does not claim nor accept
          responsibility for any privacy policies, practices and/or procedures
          of other such websites. Therefore, we encourage all users and visitors
          to be aware when they leave our website and to read the privacy
          statements of each and every website that collects personally
          identifiable information. The aforementioned Privacy Policy Agreement
          applies only and solely to the information collected by our website.
        </Text>

        <Text style={styles.text}>
          Security Connect Our Kids LLC shall endeavor and shall take every
          precaution to maintain adequate physical, procedural and technical
          security with respect to our offices and information storage
          facilities so as to prevent any loss, misuse, unauthorized access,
          disclosure or modification of the user's personal information under
          our control.
        </Text>

        <Text style={styles.text}>
          The company also uses Secure Socket Layer (SSL) for authentication and
          private communications in an effort to build users' trust and
          confidence in the internet and website use by providing simple and
          secure access and communication of credit card and personal
          information.
        </Text>

        <Text style={styles.text}>
          Changes to Privacy Policy Agreement Connect Our Kids LLC reserves the
          right to update and/or change the terms of our privacy policy, and as
          such we will post those change to our website homepage at
          Search.connectourkids.org, so that our users and/or visitors are
          always aware of the type of information we collect, how it will be
          used, and under what circumstances, if any, we may disclose such
          information. If at any point in time Connect Our Kids LLC decides to
          make use of any personally identifiable information on file, in a
          manner vastly different from that which was stated when this
          information was initially collected, the user or users shall be
          promptly notified by email. Users at that time shall have the option
          as to whether or not to permit the use of their information in this
          separate manner.
        </Text>

        <Text style={styles.text}>
          Acceptance of Terms Through the use of this website, you are hereby
          accepting the terms and conditions stipulated within the
          aforementioned Privacy Policy Agreement. If you are not in agreement
          with our terms and conditions, then you should refrain from further
          use of our sites. In addition, your continued use of our website
          following the posting of any updates or changes to our terms and
          conditions shall mean that you are in agreement and acceptance of such
          changes.
        </Text>

        <Text style={styles.text}>
          How to Contact Us If you have any questions or concerns regarding the
          Privacy Policy Agreement related to our website, please feel free to
          contact us at the following email, telephone number or mailing
          address.
        </Text>

        <Text style={styles.text}>Email: support@connectourkids.org</Text>

        <View style={styles.mb}>
          <Text>Mailing Address:</Text>
          <Text>Connect Our Kids LLC</Text>
          <Text>1069 W Broad St Ste 778</Text>
          <Text>Falls Church, Virginia 22046</Text>
          <View style={styles.row}>
            <Text>03/21/2019</Text>
            <TouchableWithoutFeedback onPress={props.closeModal}>
              <Text style={[styles.close, styles.mb]}>❌</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 30 : 15
  },
  text: {
    paddingBottom: 10
  },
  mb: {
    marginBottom: 20
  },
  close: {
    alignSelf: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginBottom: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default PrivacyPolicy;
