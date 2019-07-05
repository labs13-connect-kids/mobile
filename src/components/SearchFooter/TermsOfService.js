import React from 'react'
import { View, Text,
  TouchableWithoutFeedback, StyleSheet, Image, Platform, ScrollView } from 'react-native'
import logo from '../../../assets/logoSmall.png'
import constants from '../../helpers/constants';
import { sendEvent } from '../../helpers/createEvent'

const TermsOfService = (props) => {
  return     <ScrollView style={styles.container}>

        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} width={100}/>
          </View>
          <TouchableWithoutFeedback onPress={props.closeModal}>
            <Text style={styles.close}>❌</Text>
          </TouchableWithoutFeedback>
        </View>

      <Text style={styles.text}>TERMS OF SERVICE AGREEMENT</Text>
      
      <Text style={styles.text}>
        PLEASE READ THE FOLLOWING TERMS OF SERVICE AGREEMENT CAREFULLY. BY
        ACCESSING OR USING OUR SITES AND OUR SERVICES, YOU HEREBY AGREE TO BE
        BOUND BY THE TERMS AND ALL TERMS INCORPORATED HEREIN BY REFERENCE. IT IS
        THE RESPONSIBILITY OF YOU, THE USER, CUSTOMER, OR PROSPECTIVE CUSTOMER
        TO READ THE TERMS AND CONDITIONS BEFORE PROCEEDING TO USE THIS SITE. IF
        YOU DO NOT EXPRESSLY AGREE TO ALL OF THE TERMS AND CONDITIONS, THEN
        PLEASE DO NOT ACCESS OR USE OUR SITES OR OUR SERVICES. THIS TERMS OF
        SERVICE AGREEMENT IS EFFECTIVE AS OF 03/21/2019.
      </Text>

      <Text style={styles.text}>
        ACCEPTANCE OF TERMS
      </Text>

      <Text style={styles.text}>
        The following Terms of Service Agreement (the "TOS") is a legally binding agreement that shall
        govern the relationship with our users and others which may interact or interface with Connect
        Our Kids LLC, also known as Connect Our Kids, located at 1069 West Broad Street, Suite 778,
        Falls Church, Virginia 22031 and our subsidiaries and affiliates, in association with the use of the
        Connect Our Kids website, which includes Search.connectourkids.org, (the "Site") and its
        Services, which shall be defined below.
      </Text>

      <Text style={styles.text}>
        DESCRIPTION OF WEBSITE SERVICES OFFERED
      </Text>

      <Text style={styles.text}>
        The Site is a non-profit website a data search website which has the following description:
      </Text>

      <Text style={styles.text}>
        A website that allows social workers to search for contact information of associates of foster kids
        for the purposes of placing the foster child in a permanent loving home.
      </Text>

      <Text style={styles.text}>
        Any and all visitors to our site, despite whether they are registered or not, shall be deemed as
        "users" of the herein contained Services provided for the purpose of this TOS. Once an individual
        register's for our Services, through the process of creating an account, the user shall then be
        considered a "member."
      </Text>

      <Text style={styles.text}>
        The user and/or member acknowledges and agrees that the Services provided and made
        available through our website and applications, which may include some mobile applications and
        that those applications may be made available on various social media networking sites and
        numerous other platforms and downloadable programs, are the sole property of Connect Our
        Kids LLC. At its discretion, Connect Our Kids LLC may offer additional website Services and/or
        products, or update, modify or revise any current content and Services, and this Agreement shall
        apply to any and all additional Services and/or products and any and all updated, modified or
        revised Services unless otherwise stipulated. Connect Our Kids LLC does hereby reserve the
        right to cancel and cease offering any of the aforementioned Services and/or products. You, as
        the end user and/or member, acknowledge, accept and agree that Connect Our Kids LLC shall
        not be held liable for any such updates, modifications, revisions, suspensions or discontinuance
        of any of our Services and/or products. Your continued use of the Services provided, after such
        posting of any updates, changes, and/or modifications shall constitute your acceptance of such
        updates, changes and/or modifications, and as such, frequent reScrollview of this Agreement and any
        and all applicable terms and policies should be made by you to ensure you are aware of all terms
        and policies currently in effect. Should you not agree to the updated, revised or modified terms,
        you must stop using the provided Services forthwith.
      </Text>

      <Text style={styles.text}>
        Furthermore, the user and/or member understands, acknowledges and agrees that the Services
        offered shall be provided "AS IS" and as such Connect Our Kids LLC shall not assume any
        responsibility or obligation for the timeliness, missed delivery, deletion and/or any failure to store
        user content, communication or personalization settings.
      </Text>

      <Text style={styles.text}>
        REGISTRATION
      </Text>

      <Text style={styles.text}>
        To register and become a "member" of the Site, you must be at least 18 years of age to enter into
        and form a legally binding contract. In addition, you must be in good standing and not an
        individual that has been previously barred from receiving Connect Our Kids's Services under the
        laws and statutes of the United States or other applicable jurisdiction.
      </Text>

      <Text style={styles.text}>
        When you register, Connect Our Kids may collect information such as your name, e-mail
        address, birth date, gender, mailing address, occupation, industry and personal interests. You can
        edit your account information at any time. Once you register with Connect Our Kids and sign in to our
        Services, you are no longer anonymous to us.
      </Text>

      <Text style={styles.text}>
        Furthermore, the registering party hereby acknowledges, understands and agrees to:
      </Text>

      <Text style={styles.text}>
        a)     furnish factual, correct, current and complete information with regards to yourself as may
        be requested by the data registration process, and
      </Text>

      <Text style={styles.text}>
        b)    maintain and promptly update your registration and profile information in an effort to
        maintain accuracy and completeness at all times.
      </Text>
  
      <Text style={styles.text}>
        If anyone knowingly provides any information of a false, untrue, inaccurate or incomplete nature,
        Connect Our Kids LLC will have sufficient grounds and rights to suspend or terminate the
        member in violation of this aspect of the Agreement, and as such refuse any and all current or
        future use of Connect Our Kids LLC Services, or any portion thereof.
      </Text>
      
      <Text style={styles.text}>
        It is Connect Our Kids LLC's priority to ensure the safety and privacy of all its visitors, users and
        members, especially that of children. Therefore, it is for this reason that the parents of any child
        under the age of 13 that permit their child or children access to the Connect Our Kids website
        platform Services must create a "family" account, which will certify that the individual creating the
        "family" account is of 18 years of age and as such, the parent or legal guardian of any child or
        children registered under the "family" account. As the creator of the "family" account, s/he is
        thereby granting permission for his/her child or children to access the various Services provided,
        including, but not limited to, message boards, email, and/or instant messaging. It is the parent's
        and/or legal guardian's responsibility to determine whether any of the Services and/or content
        provided are age-appropriate for his/her child.
      </Text>
      
      <Text style={styles.text}>
        PRIVACY POLICY
      </Text>

      <Text style={styles.text}>
        Every member's registration data and various other personal information are strictly protected by
        the Connect Our Kids LLC Online Privacy Policy 
        <TouchableWithoutFeedback 
          onPress={() => {
            sendEvent(props.isLoggedIn ? props.user.email: 'anonymous@unknown.org', 'click', 'privacy')
            props.controlModal('terms', false)
            props.controlModal('privacy', true)
          }
          }
        >
          <Text style={styles.linkText}>{' '}  (see the full Privacy Policy). {' '} </Text>
        </TouchableWithoutFeedback>
        As a member, you herein consent to the collection and
        use of the information provided, including the transfer of information within the United States
        and/or other countries for storage, processing or use by Connect Our Kids LLC and/or our
        subsidiaries and affiliates.
      </Text>
      
      <Text style={styles.text}>
        MEMBER ACCOUNT, USERNAME, PASSWORD AND SECURITY
      </Text>

      <Text style={styles.text}>
        When you set up an account, you are the sole authorized user of your account. You shall be
        responsible for maintaining the secrecy and confidentiality of your password and for all activities
        that transpire on or within your account. It is your responsibility for any act or omission of any
        user(s) that access your account information that, if undertaken by you, would be deemed a
        violation of the TOS. It shall be your responsibility to notify Connect Our Kids LLC immediately if
        you notice any unauthorized access or use of your account or password or any other breach of
        security. Connect Our Kids LLC shall not be held liable for any loss and/or damage arising from
        any failure to comply with this term and/or condition of the TOS.
      </Text>

      <Text style={styles.text}>
        CONDUCT
      </Text>

      <Text style={styles.text}>
        As a user or member of the Site, you herein acknowledge, understand and agree that all
        information, text, software, data, photographs, music, video, messages, tags or any other
        content, whether it is publicly or privately posted and/or transmitted, is the expressed sole
        responsibility of the individual from whom the content originated. In short, this means that you are
        solely responsible for any and all content posted, uploaded, emailed, transmitted or otherwise
        made available by way of the Connect Our Kids Services, and as such, we do not guarantee the
        accuracy, integrity or quality of such content. It is expressly understood that by use of our
        Services, you may be exposed to content including, but not limited to, any errors or omissions in
        any content posted, and/or any loss or damage of any kind incurred as a result of the use of any
        content posted, emailed, transmitted or otherwise made available by Connect Our Kids.
      </Text>

      <Text style={styles.text}>
        Furthermore, you herein agree not to make use ofC onnect Our Kids LLC's Services for the
        purpose of:
      </Text>
    
      <Text style={styles.text}>
        a)     uploading, posting, emailing, transmitting, or otherwise making available any content that
        shall be deemed unlawful, harmful, threatening, abusive, harassing, tortious, defamatory,
        vulgar, obscene, libelous, or invasive of another's privacy or which is hateful, and/or
        racially, ethnically, or otherwise objectionable;
      </Text>

      <Text style={styles.text}>
        b)    causing harm to minors in any manner whatsoever;
      </Text>

      <Text style={styles.text}>
        c)     impersonating any individual or entity, including, but not limited to, any Connect Our Kids
        officials, forum leaders, guides or hosts or falsely stating or otherwise misrepresenting any
        affiliation with an individual or entity;
      </Text>

      <Text style={styles.text}>
        d)    forging captions, headings or titles or otherwise offering any content that you personally
        have no right to pursuant to any law nor having any contractual or fiduciary relationship
        with;
      </Text>
    
      <Text style={styles.text}>
        e)     uploading, posting, emailing, transmitting or otherwise offering any such content that may
        infringe upon any patent, copyright, trademark, or any other proprietary or intellectual
        rights of any other party;
      </Text>

      <Text style={styles.text}>
        f)     uploading, posting, emailing, transmitting or otherwise offering any content that you do not
        personally have any right to offer pursuant to any law or in accordance with any
        contractual or fiduciary relationship;
      </Text>

      <Text style={styles.text}>
        g)     uploading, posting, emailing, transmitting, or otherwise offering any unsolicited or
        unauthorized advertising, promotional flyers, "junk mail," "spam," or any other form of
        solicitation, except in any such areas that may have been designated for such purpose;
      </Text>

      <Text style={styles.text}>
        h)    uploading, posting, emailing, transmitting, or otherwise offering any source that may
        contain a software virus or other computer code, any files and/or programs which have
        been designed to interfere, destroy and/or limit the operation of any computer software,
        hardware, or telecommunication equipment;
      </Text>

      <Text style={styles.text}>
        i)      disrupting the normal flow of communication, or otherwise acting in any manner that would
        negatively affect other users' ability to participate in any real time interactions;
      </Text>

      <Text style={styles.text}>
        j)      interfering with or disrupting any Connect Our Kids LLC Services, servers and/or networks
        that may be connected or related to our website, including, but not limited to, the use of
        any device software and/or routine to bypass the robot exclusion headers;
      </Text>

      <Text style={styles.text}>
        k)    intentionally or unintentionally violating any local, state, federal, national or international
        law, including, but not limited to, rules, guidelines, and/or regulations decreed by the U.S.
        Securities and Exchange Commission, in addition to any rules of any nation or other
        securities exchange, that would include without limitation, the New York Stock Exchange,
        the American Stock Exchange, or the NASDAQ, and any regulations having the force of
        law;
      </Text>

      <Text style={styles.text}>
        l)      providing informational support or resources, concealing and/or disguising the character,
        location, and or source to any organization delegated by the United States government as
        a "foreign terrorist organization" in accordance to Section 219 of the Immigration
        Nationality Act;
      </Text>

      <Text style={styles.text}>
        m)   "stalking" or with the intent to otherwise harass another individual; and/or
      </Text>

      <Text style={styles.text}>
        n)    collecting or storing of any personal data relating to any other member or user in
        connection with the prohibited conduct and/or activities which have been set forth in the
        aforementioned paragraphs.
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC herein reserves the right to pre-screen, refuse and/or delete any content
        currently available through our Services. In addition, we reserve the right to remove and/or delete
        any such content that would violate the TOS or which would otherwise be considered offensive to
        other visitors, users and/or members.
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC herein reserves the right to access, preserve and/or disclose member
        account information and/or content if it is requested to do so by law or in good faith belief that any
        such action is deemed reasonably necessary for:
      </Text>

      <Text style={styles.text}>
        a)     compliance with any legal process;
      </Text>

      <Text style={styles.text}>
        b)    enforcement of the TOS;
      </Text>

      <Text style={styles.text}>
        c)     responding to any claim that therein contained content is in violation of the rights of any
        third party;
      </Text>
  
      <Text style={styles.text}>
        d)    responding to requests for customer service; or
      </Text>

      <Text style={styles.text}>
        e)     protecting the rights, property or the personal safety of Connect Our Kids LLC, its visitors,
        users and members, including the general public.
      </Text>
  
      <Text style={styles.text}>
        Connect Our Kids LLC herein reserves the right to include the use of security components that
        may permit digital information or material to be protected, and that such use of information and/or
        material is subject to usage guidelines and regulations established by Connect Our Kids LLC or
        any other content providers supplying content services to Connect Our Kids LLC. You are hereby
        prohibited from making any attempt to override or circumvent any of the embedded usage rules in
        our Services. Furthermore, unauthorized reproduction, publication, distribution, or exhibition of
        any information or materials supplied by our Services, despite whether done so in whole or in
        part, is expressly prohibited.
      </Text>

      <Text style={styles.text}>
        CAUTIONS FOR GLOBAL USE AND EXPORT AND IMPORT COMPLIANCE
      </Text>

      <Text style={styles.text}>
        Due to the global nature of the internet, through the use of our network you hereby agree to
        comply with all local rules relating to online conduct and that which is considered acceptable
        Content. Uploading, posting and/or transferring of software, technology and other technical data
        may be subject to the export and import laws of the United States and possibly other countries.
        Through the use of our network, you thus agree to comply with all applicable export and import
        laws, statutes and regulations, including, but not limited to, the Export Administration Regulations
        (http://www.access.gpo.gov/bis/ear/ear_data.html), as well as the sanctions control program of
        the United States (http://www.treasury.gov/resource-
        center/sanctions/Programs/Pages/Programs.aspx). Furthermore, you state and pledge that you:
      </Text>

      <Text style={styles.text}>
        a)     are not on the list of prohibited individuals which may be identified on any government
        export exclusion report (http://www.bis.doc.gov/complianceandenforcement/liststocheck.htm)
        nor a member of any other government which may be part of an export-prohibited country
        identified in applicable export and import laws and regulations;
      </Text>

      <Text style={styles.text}>
        b)    agree not to transfer any software, technology or any other technical data through the use
        of our network Services to any export-prohibited country;
      </Text>

      <Text style={styles.text}>
        c)     agree not to use our website network Services for any military, nuclear, missile, chemical
        or biological weaponry end uses that would be a violation of the U.S. export laws; and
      </Text>

      <Text style={styles.text}>
        d)    agree not to post, transfer nor upload any software, technology or any other technical data
        which would be in violation of the U.S. or other applicable export and/or import laws.
      </Text>

      <Text style={styles.text}>
        CONTENT PLACED OR MADE AVAILABLE FOR COMPANY SERVICES
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC shall not lay claim to ownership of any content submitted by any visito,r
        member, or user, nor make such content available for inclusion on our website Services.
        Therefore, you hereby grant and allow for Connect Our Kids LLC the below listed worldwide,
        royalty-free and non-exclusive licenses, as applicable:
      </Text>

      <Text style={styles.text}>
        a)     The content submitted or made available for inclusion on the publicly accessible areas of
        Connect Our Kids LLC's sites, the license provided to permit to use, distribute, reproduce,
        modify, adapt, publicly perform and/or publicly display said Content on our network
        Services is for the sole purpose of providing and promoting the specific area to which this
        content was placed and/or made available for Scrollviewing. This license shall be available so
        long as you are a member of Connect Our Kids LLC's sites, and shall terminate at such
        time when you elect to discontinue your membership.
        </Text>

      <Text style={styles.text}>
        b)    Photos, audio, video and/or graphics submitted or made available for inclusion on the
        publicly accessible areas of Connect Our Kids LLC's sites, the license provided to permit
        to use, distribute, reproduce, modify, adapt, publicly perform and/or publicly display said
        Content on our network Services are for the sole purpose of providing and promoting the
        specific area in which this content was placed and/or made available for Scrollviewing. This
        license shall be available so long as you are a member of Connect Our Kids LLC's sites
        and shall terminate at such time when you elect to discontinue your membership.
      </Text>

      <Text style={styles.text}>
        c)     For any other content submitted or made available for inclusion on the publicly accessible
        areas of Connect Our Kids LLC's sites, the continuous, binding and completely sub-
        licensable license which is meant to permit to use, distribute, reproduce, modify, adapt,
        publish, translate, publicly perform and/or publicly display said content, whether in whole or
        in part, and the incorporation of any such Content into other works in any arrangement or
        medium current used or later developed.
      </Text>

      <Text style={styles.text}>
        Those areas which may be deemed "publicly accessible" areas ofC onnect Our Kids LLC's sites
        are those such areas of our network properties which are meant to be available to the general
        public, and which would include message boards and groups that are openly available to both
        users and members.
      </Text>

      <Text style={styles.text}>
        CONTRIBUTIONS TO COMPANY WEBSITE
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC provides an area for our users and members to contribute feedback to our
        website. When you submit ideas, documents, suggestions and/or proposals ("Contributions") to
        our site, you acknowledge and agree that:
      </Text>

      <Text style={styles.text}>
        a)     your contributions do not contain any type of confidential or proprietary information;
      </Text>

      <Text style={styles.text}>
        b)    Connect Our Kids shall not be liable or under any obligation to ensure or maintain
        confidentiality, expressed or implied, related to any Contributions;
      </Text>

      <Text style={styles.text}>
        c)     Connect Our Kids shall be entitled to make use of and/or disclose any such Contributions
        in any such manner as they may see fit;
      </Text>

      <Text style={styles.text}>
        d)    the contributor's Contributions shall automatically become the sole property ofC onnect
        Our Kids; and
      </Text>

      <Text style={styles.text}>
        e)     Connect Our Kids is under no obligation to either compensate or provide any form of
        reimbursement in any manner or nature.
      </Text>

      <Text style={styles.text}>
        INDEMNITY
      </Text>

      <Text style={styles.text}>
        All users and/or members herein agree to insure and hold Connect Our Kids LLC, our
        subsidiaries, affiliates, agents, employees, officers, partners and/or licensors blameless or not
        liable for any claim or demand, which may include, but is not limited to, reasonable attorney fees
        made by any third party which may arise from any content a member or user of our site may
        submit, post, modify, transmit or otherwise make available through our Services, the use of
        Connect Our Kids Services or your connection with these Services, your violations of the Terms
        of Service and/or your violation of any such rights of another person.
      </Text>

      <Text style={styles.text}>
        COMMERCIAL REUSE OF SERVICES
      </Text>

      <Text style={styles.text}>
        The member or user herein agrees not to replicate, duplicate, copy, trade, sell, resell nor exploit
        for any commercial reason any part, use of, or access to Connect Our Kids's sites.
      </Text>

      <Text style={styles.text}>
        USE AND STORAGE GENERAL PRACTICES
      </Text>

      <Text style={styles.text}>
        You herein acknowledge that Connect Our Kids LLC may set up any such practices and/or limits
        regarding the use of our Services, without limitation of the maximum number of days that any
        email, message posting or any other uploaded content shall be retained by Connect Our Kids
        LLC, nor the maximum number of email messages that may be sent and/or received by any
        member, the maximum volume or size of any email message that may be sent from or may be
        received by an account on our Service, the maximum disk space allowable that shall be allocated
        on Connect Our Kids LLC's servers on the member's behalf, and/or the maximum number of
        times and/or duration that any member may access our Services in a given period of time.  In
        addition, you also agree that Connect Our Kids LLC has absolutely no responsibility or liability for
        the removal or failure to maintain storage of any messages and/or other communications or
        content maintained or transmitted by our Services. You also herein acknowledge that we reserve
        the right to delete or remove any account that is no longer active for an extended period of time.
        Furthermore, Connect Our Kids LLC shall reserve the right to modify, alter and/or update these
        general practices and limits at our discretion.
      </Text>

      <Text style={styles.text}>
        MODIFICATIONS
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC shall reserve the right at any time it may deem fit, to modify, alter and or
        discontinue, whether temporarily or permanently, our service, or any part thereof, with or without
        prior notice. In addition, we shall not be held liable to you or to any third party for any such
        alteration, modification, suspension and/or discontinuance of our Services, or any part thereof.
      </Text>

      <Text style={styles.text}>
        TERMINATION
      </Text>

      <Text style={styles.text}>
        As a member of Search.connectourkids.org, you may cancel or terminate your account,
        associated email address and/or access to our Services by submitting a cancellation or
        termination request to support@connectourkids.org.
      </Text>

      <Text style={styles.text}>
        As a member, you agree that Connect Our Kids LLC may, without any prior written notice,
        immediately suspend, terminate, discontinue and/or limit your account, any email associated with
        your account, and access to any of our Services. The cause for such termination, discontinuance,
        suspension and/or limitation of access shall include, but is not limited to:
      </Text>

      <Text style={styles.text}>
        a)     any breach or violation of our TOS or any other incorporated agreement, regulation and/or
        guideline;
      </Text>

      <Text style={styles.text}>
        b)    by way of requests from law enforcement or any other governmental agencies;
      </Text>

      <Text style={styles.text}>
        c)     the discontinuance, alteration and/or material modification to our Services, or any part
        thereof;
      </Text>

      <Text style={styles.text}>
        d)    unexpected technical or security issues and/or problems;
      </Text>

      <Text style={styles.text}>
        e)     any extended periods of inactivity;
      </Text>

      <Text style={styles.text}>
        f)     any engagement by you in any fraudulent or illegal activities; and/or
      </Text>

      <Text style={styles.text}>
        g)     the nonpayment of any associated fees that may be owed by you in connection with your
        Search.connectourkids.org account Services.
      </Text>

      <Text style={styles.text}>
        Furthermore, you herein agree that any and all terminations, suspensions, discontinuances, and
        or limitations of access for cause shall be made at our sole discretion and that we shall not be
        liable to you or any other third party with regards to the termination of your account, associated
        email address and/or access to any of our Services.
      </Text>

      <Text style={styles.text}>
        The termination of your account with Search.connectourkids.org shall include any and/or all of the
        following:
      </Text>

      <Text style={styles.text}>
        a)     the removal of any access to all or part of the Services offered within
        Search.connectourkids.org;
      </Text>

      <Text style={styles.text}>
        b)    the deletion of your password and any and all related information, files, and any such
        content that may be associated with or inside your account, or any part thereof; and
      </Text>

      <Text style={styles.text}>
        c)     the barring of any further use of all or part of our Services.
      </Text>

      <Text style={styles.text}>
        ADVERTISERS
      </Text>

      <Text style={styles.text}>
        Any correspondence or business dealings with, or the participation in any promotions of,
        advertisers located on or through our Services, which may include the payment and/or delivery of
        such related goods and/or Services, and any such other term, condition, warranty and/or
        representation associated with such dealings, are and shall be solely between you and any such
        advertiser. Moreover, you herein agree that Connect Our Kids LLC shall not be held responsible
        or liable for any loss or damage of any nature or manner incurred as a direct result of any such
        dealings or as a result of the presence of such advertisers on our website.
      </Text>

      <Text style={styles.text}>
        LINKS
      </Text>

      <Text style={styles.text}>
        Either Connect Our Kids LLC or any third parties may provide links to other websites and/or
        resources. Thus, you acknowledge and agree that we are not responsible for the availability of
        any such external sites or resources, and as such, we do not endorse nor are we responsible or
        liable for any content, products, advertising or any other materials, on or available from such third
        party sites or resources. Furthermore, you acknowledge and agree that Connect Our Kids LLC
        shall not be responsible or liable, directly or indirectly, for any such damage or loss which may be
        a result of, caused or allegedly to be caused by or in connection with the use of or the reliance on
        any such content, goods or Services made available on or through any such site or resource.
      </Text>

      <Text style={styles.text}>
        PROPRIETARY RIGHTS
      </Text>

      <Text style={styles.text}>
        You do hereby acknowledge and agree that Connect Our Kids LLC's Services and any essential
        software that may be used in connection with our Services ("Software") shall contain proprietary
        and confidential material that is protected by applicable intellectual property rights and other laws.
        Furthermore, you herein acknowledge and agree that any Content which may be contained in any
        advertisements or information presented by and through our Services or by advertisers is
        protected by copyrights, trademarks, patents or other proprietary rights and laws. Therefore,
        except for that which is expressly permitted by applicable law or as authorized by Connect Our
        Kids LLC or such applicable licensor, you agree not to alter, modify, lease, rent, loan, sell,
        distribute, transmit, broadcast, publicly perform and/or created any plagiaristic works which are
        based on Connect Our Kids LLC Services (e.g. Content or Software), in whole or part.
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC herein has granted you personal, non-transferable and non-exclusive
        rights and/or license to make use of the object code or our Software on a single computer, as
        long as you do not, and shall not, allow any third party to duplicate, alter, modify, create or
        plagiarize work from, reverse engineer, reverse assemble or otherwise make an attempt to locate
        or discern any source code, sell, assign, sublicense, grant a security interest in and/or otherwise
        transfer any such right in the Software. Furthermore, you do herein agree not to alter or change
        the Software in any manner, nature or form, and as such, not to use any modified versions of the
        Software, including and without limitation, for the purpose of obtaining unauthorized access to our
        Services. Lastly, you also agree not to access or attempt to access our Services through any
        means other than through the interface which is provided by Connect Our Kids LLC for use in
        accessing our Services.
      </Text>

      <Text style={styles.text}>
        WARRANTY DISCLAIMERS
      </Text>

      <Text style={styles.text}>
        YOU HEREIN EXPRESSLY ACKNOWLEDGE AND AGREE THAT:
      </Text>

      <Text style={styles.text}>
        a)     THE USE OF CONNECT OUR KIDS LLC SERVICES AND SOFTWARE ARE AT THE
        SOLE RISK BY YOU. OUR SERVICES AND SOFTWARE SHALL BE PROVIDED ON AN
        "AS IS" AND/OR "AS AVAILABLE" BASIS. CONNECT OUR KIDS LLC AND OUR
        SUBSIDIARIES, AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS AND
        LICENSORS EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES OF ANY KIND
        WHETHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO ANY
        IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE AND NON-INFRINGEMENT.
      </Text>

      <Text style={styles.text}>
        b)    CONNECT OUR KIDS LLC AND OUR SUBSIDIARIES, OFFICERS, EMPLOYEES,
        AGENTS, PARTNERS AND LICENSORS MAKE NO SUCH WARRANTIES THAT (i)
        CONNECT OUR KIDS LLC SERVICES OR SOFTWARE WILL MEET YOUR
        REQUIREMENTS; (ii) CONNECT OUR KIDS LLC SERVICES OR SOFTWARE SHALL BE
        UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE; (iii) THAT SUCH RESULTS
        WHICH MAY BE OBTAINED FROM THE USE OF THE CONNECT OUR KIDS LLC
        SERVICES OR SOFTWARE WILL BE ACCURATE OR RELIABLE; (iv) QUALITY OF ANY
        PRODUCTS, SERVICES, ANY INFORMATION OR OTHER MATERIAL WHICH MAY BE
        PURCHASED OR OBTAINED BY YOU THROUGH OUR SERVICES OR SOFTWARE
        WILL MEET YOUR EXPECTATIONS; AND (v) THAT ANY SUCH ERRORS CONTAINED
        IN THE SOFTWARE SHALL BE CORRECTED.
      </Text>

      <Text style={styles.text}>
        c)     ANY INFORMATION OR MATERIAL DOWNLOADED OR OTHERWISE OBTAINED BY
        WAY OF CONNECT OUR KIDS LLC SERVICES OR SOFTWARE SHALL BE ACCESSED
        BY YOUR SOLE DISCRETION AND SOLE RISK, AND AS SUCH YOU SHALL BE
        SOLELY RESPONSIBLE FOR AND HEREBY WAIVE ANY AND ALL CLAIMS AND
        CAUSES OF ACTION WITH RESPECT TO ANY DAMAGE TO YOUR COMPUTER
        AND/OR INTERNET ACCESS, DOWNLOADING AND/OR DISPLAYING, OR FOR ANY
        LOSS OF DATA THAT COULD RESULT FROM THE DOWNLOAD OF ANY SUCH
        INFORMATION OR MATERIAL.
      </Text>

      <Text style={styles.text}>
        d)    NO ADVICE AND/OR INFORMATION, DESPITE WHETHER WRITTEN OR ORAL, THAT
        MAY BE OBTAINED BY YOU FROM CONNECT OUR KIDS LLC OR BY WAY OF OR
        FROM OUR SERVICES OR SOFTWARE SHALL CREATE ANY WARRANTY NOT
        EXPRESSLY STATED IN THE TOS.
      </Text>

      <Text style={styles.text}>
        e)     A SMALL PERCENTAGE OF SOME USERS MAY EXPERIENCE SOME DEGREE OF
        EPILEPTIC SEIZURE WHEN EXPOSED TO CERTAIN LIGHT PATTERNS OR
        BACKGROUNDS THAT MAY BE CONTAINED ON A COMPUTER SCREEN OR WHILE
        USING OUR SERVICES. CERTAIN CONDITIONS MAY INDUCE A PREVIOUSLY
        UNKNOWN CONDITION OR UNDETECTED EPILEPTIC SYMPTOM IN USERS WHO
        HAVE SHOWN NO HISTORY OF ANY PRIOR SEIZURE OR EPILEPSY. SHOULD YOU,
        ANYONE YOU KNOW OR ANYONE IN YOUR FAMILY HAVE AN EPILEPTIC
        CONDITION, PLEASE CONSULT A PHYSICIAN IF YOU EXPERIENCE ANY OF THE
        FOLLOWING SYMPTOMS WHILE USING OUR SERVICES: DIZZINESS, ALTERED
        VISION, EYE OR MUSCLE TWITCHES, LOSS OF AWARENESS, DISORIENTATION,
        ANY INVOLUNTARY MOVEMENT, OR CONVULSIONS.
      </Text>

      <Text style={styles.text}>
        LIMITATION OF LIABILITY
      </Text>

      <Text style={styles.text}>
        YOU EXPLICITLY ACKNOWLEDGE, UNDERSTAND AND AGREE THAT CONNECT OUR KIDS
        LLC AND OUR SUBSIDIARIES, AFFILIATES, OFFICERS, EMPLOYEES, AGENTS,
        PARTNERS AND LICENSORS SHALL NOT BE LIABLE TO YOU FOR ANY PUNITIVE,
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES,
        INCLUDING, BUT NOT LIMITED TO, DAMAGES WHICH MAY BE RELATED TO THE LOSS OF
        ANY PROFITS, GOODWILL, USE, DATA AND/OR OTHER INTANGIBLE LOSSES, EVEN
        THOUGH WE MAY HAVE BEEN ADVISED OF SUCH POSSIBILITY THAT SAID DAMAGES
        MAY OCCUR, AND RESULT FROM:
      </Text>

      <Text style={styles.text}>
        a)     THE USE OR INABILITY TO USE OUR SERVICE;
      </Text>

      <Text style={styles.text}>
        b)    THE COST OF PROCURING SUBSTITUTE GOODS AND SERVICES;
      </Text>

      <Text style={styles.text}>
        c)     UNAUTHORIZED ACCESS TO OR THE ALTERATION OF YOUR TRANSMISSIONS
        AND/OR DATA;
      </Text>

      <Text style={styles.text}>
        d)    STATEMENTS OR CONDUCT OF ANY SUCH THIRD PARTY ON OUR SERVICE;
      </Text>

      <Text style={styles.text}>
        e)     AND ANY OTHER MATTER WHICH MAY BE RELATED TO OUR SERVICE.
      </Text>

      <Text style={styles.text}>
        RELEASE
      </Text>

      <Text style={styles.text}>
        In the event you have a dispute, you agree to releaseC onnect Our Kids LLC (and its officers,
        directors, employees, agents, parent subsidiaries, affiliates, co-branders, partners and any other
        third parties) from claims, demands and damages (actual and consequential) of every kind and
        nature, known and unknown, suspected or unsuspected, disclosed and undisclosed, arising out
        of or in any way connected to such dispute.
      </Text>

      <Text style={styles.text}>
        SPECIAL ADMONITION RELATED TO FINANCIAL MATTERS
      </Text>

      <Text style={styles.text}>
        Should you intend to create or to join any service, receive or request any such news, messages,
        alerts or other information from our Services concerning companies, stock quotes, investments or
        securities, please reScrollview the above Sections Warranty Disclaimers and Limitations of Liability
        again. In addition, for this particular type of information, the phrase "Let the investor beware" is
        appropriate. Connect Our Kids LLC's content is provided primarily for informational purposes, and
        no content that shall be provided or included in our Services is intended for trading or investing
        purposes. Connect Our Kids LLC and our licensors shall not be responsible or liable for the
        accuracy, usefulness or availability of any information transmitted and/or made available by way
        of our Services, and shall not be responsible or liable for any trading and/or investment decisions
        based on any such information.
      </Text>

      <Text style={styles.text}>
        EXCLUSION AND LIMITATIONS
      </Text>

      <Text style={styles.text}>
        THERE ARE SOME JURISDICTIONS WHICH DO NOT ALLOW THE EXCLUSION OF CERTAIN
        WARRANTIES OR THE LIMITATION OF EXCLUSION OF LIABILITY FOR INCIDENTAL OR
        CONSEQUENTIAL DAMAGES. THEREFORE, SOME OF THE ABOVE LIMITATIONS OF
        SECTIONS WARRANTY DISCLAIMERS AND LIMITATION OF LIABILITY MAY NOT APPLY TO
        YOU.
      </Text>

      <Text style={styles.text}>
        THIRD PARTY BENEFICIARIES
      </Text>

      <Text style={styles.text}>
        You herein acknowledge, understand and agree, unless otherwise expressly provided in this
        TOS, that there shall be no third-party beneficiaries to this agreement.
      </Text>

      <Text style={styles.text}>
        NOTICE
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC may furnish you with notices, including those with regards to any changes
        to the TOS, including but not limited to email, regular mail, MMS or SMS, text messaging,
        postings on our website Services, or other reasonable means currently known or any which may
        be herein after developed. Any such notices may not be received if you violate any aspects of the
        TOS by accessing our Services in an unauthorized manner. Your acceptance of this TOS
        constitutes your agreement that you are deemed to have received any and all notices that would
        have been delivered had you accessed our Services in an authorized manner.
      </Text>

      <Text style={styles.text}>
        TRADEMARK INFORMATION
      </Text>

      <Text style={styles.text}>
        You herein acknowledge, understand and agree that all of the Connect Our Kids LLC trademarks,
        copyright, trade name, service marks, and other Connect Our Kids LLC logos and any brand
        features, and/or product and service names are trademarks and as such, are and shall remain the
        property of Connect Our Kids LLC. You herein agree not to display and/or use in any manner the
        Connect Our Kids LLC logo or marks without obtaining Connect Our Kids LLC's prior written
        consent.
      </Text>

      <Text style={styles.text}>
        COPYRIGHT OR INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS NOTICE
        & PROCEDURES
      </Text>

      <Text style={styles.text}>
        Connect Our Kids LLC will always respect the intellectual property of others, and we ask that all
        of our users do the same. With regards to appropriate circumstances and at its sole discretion,
        Connect Our Kids LLC may disable and/or terminate the accounts of any user who violates our
        TOS and/or infringes the rights of others. If you feel that your work has been duplicated in such a
        way that would constitute copyright infringement, or if you believe your intellectual property rights
        have been otherwise violated, you should provide to us the following information:
      </Text>

      <Text style={styles.text}>
        a)     The electronic or the physical signature of the individual that is authorized on behalf of the
        owner of the copyright or other intellectual property interest;
      </Text>

      <Text style={styles.text}>
        b)    A description of the copyrighted work or other intellectual property that you believe has
        been infringed upon;
      </Text>

      <Text style={styles.text}>
        c)     A description of the location of the site which you allege has been infringing upon your
        work;
      </Text>

      <Text style={styles.text}>
        d)    Your physical address, telephone number, and email address;
      </Text>

      <Text style={styles.text}>
        e)     A statement, in which you state that the alleged and disputed use of your work is not
        authorized by the copyright owner, its agents or the law;
      </Text>

      <Text style={styles.text}>
        f)     And finally, a statement, made under penalty of perjury, that the aforementioned
        information in your notice is truthful and accurate, and that you are the copyright or
        intellectual property owner, representative or agent authorized to act on the copyright or
        intellectual property owner's behalf.
      </Text>

      <Text style={styles.text}>
        The Connect Our Kids LLC Agent for notice of claims of copyright or other intellectual property
        infringement can be contacted as follows:
      </Text>

      <Text style={styles.text}>
        Mailing Address:
      </Text>
      
      <View style={styles.text}>
        <Text>
          Connect Our Kids LLC
        </Text>

        <Text>
          Attn: Copyright Agent
        </Text>

        <Text>
          1069 West Broad Street, Suite 778
        </Text>

        <Text>
          Falls Church, Virginia 22031
        </Text>

        <Text>
          Telephone:
        </Text>

        <Text>
          Email: support@connectourkids.org
        </Text>
      </View>

      <Text style={styles.text}>
        CLOSED CAPTIONING
      </Text>

      <Text style={styles.text}>
        BE IT KNOWN, that Connect Our Kids LLC complies with all applicable Federal Communications
        Commission rules and regulations regarding the closed captioning of video content. For more
        information, please visit our website at search.connectourkids.org.
      </Text>

      <Text style={styles.text}>
        GENERAL INFORMATION
      </Text>

      <Text style={styles.text}>
        ENTIRE AGREEMENT
        This TOS constitutes the entire agreement between you andC onnect Our Kids LLC and shall
        govern the use of our Services, superseding any prior version of this TOS between you and us
        with respect to Connect Our Kids LLC Services. You may also be subject to additional terms and
        conditions that may apply when you use or purchase certain other Connect Our Kids LLC
        Services, affiliate Services, third-party content or third-party software.
      </Text>

      <Text style={styles.text}>
        CHOICE OF LAW AND FORUM
        It is at the mutual agreement of both you andC onnect Our Kids LLC with regard to the TOS that
        the relationship between the parties shall be governed by the laws of the state of Virginia without
        regard to its conflict of law provisions and that any and all claims, causes of action and/or
        disputes, arising out of or relating to the TOS, or the relationship between you and Connect Our
        Kids LLC, shall be filed within the courts having jurisdiction within the County ofF airfax, Virginia
        or the U.S. District Court located in said state. You and Connect Our Kids LLC agree to submit to
        the jurisdiction of the courts as previously mentioned, and agree to waive any and all objections to
        the exercise of jurisdiction over the parties by such courts and to venue in such courts.
      </Text>

      <Text style={styles.text}>
        WAIVER AND SEVERABILITY OF TERMS
        At any time, should Connect Our Kids LLC fail to exercise or enforce any right or provision of the
        TOS, such failure shall not constitute a waiver of such right or provision. If any provision of this
        TOS is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that
        the court should endeavor to give effect to the parties' intentions as reflected in the provision, and
        the other provisions of the TOS remain in full force and effect.
      </Text>

      <Text style={styles.text}>
        NO RIGHT OF SURVIVORSHIP NON-TRANSFERABILITY
        You acknowledge, understand and agree that your account is non-transferable and any rights to
        your ID and/or contents within your account shall terminate upon your death. Upon receipt of a
        copy of a death certificate, your account may be terminated and all contents therein permanently
        deleted.
      </Text>

      <Text style={styles.text}>
        STATUTE OF LIMITATIONS
        You acknowledge, understand and agree that regardless of any statute or law to the contrary, any
        claim or action arising out of or related to the use of our Services or the TOS must be filed within
        1 year(s) after said claim or cause of action arose or shall be forever barred.
      </Text>

      <Text style={styles.text}>
        VIOLATIONS
      </Text>

      <Text style={styles.text}>
        Please report any and all violations of this TOS to Connect Our Kids LLC as follows:
      </Text>

      <Text style={styles.text}>
        Mailing Address:
      </Text>

      <View style={styles.text}>
        <Text>
          Connect Our Kids LLC
        </Text>

        <Text>
          1069 West Broad Street, Suite 778
        </Text>

        <Text>
          Falls Church, Virginia 22031
        </Text>

        <Text>
          Telephone:
        </Text>

        <Text>
          Email:        support@connectourkids.org
        </Text>
      </View>

      <View style={[styles.row, styles.mb]}>
        <Text>
          Copyright Connect Our Kids 2019
        </Text>
        <TouchableWithoutFeedback onPress={props.closeModal}>
          <Text style={[styles.close, styles.mb]}>❌</Text>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 30 : 15
  },
  text: {
    paddingBottom: 20
  },
  linkText: {
    color: constants.highlightColor
  },
  logo: {
    width: 100
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
})

export default TermsOfService
