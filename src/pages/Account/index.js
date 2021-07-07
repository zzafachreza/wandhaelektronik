import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  // Icon,
  Button,
} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(user);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const handleSave = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'blue',

          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              // borderWidth: 1,
              backgroundColor: colors.secondary,
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Text
              style={{
                fontSize: 50,
                color: 'white',
              }}>
              {iLogo}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 25,
              fontFamily: fonts.secondary[600],
              top: 10,
              color: colors.white,
            }}>
            {user.nama_lengkap}
          </Text>
          <Divider style={{backgroundColor: colors.border, height: 1}} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.secondary[400],
              top: 10,
              color: colors.white,
            }}>
            {user.tlp}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'green',
            flex: 1,
          }}>
          <View
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              E-mail
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {user.email}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              padding: 10,
              borderRadius: 10,
              backgroundColor: colors.white,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              Alamat
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {user.alamat}
            </Text>
          </View>
          <Button
            onPress={handleSave}
            title="Sign Out"
            icon={
              <Icon
                style={{
                  marginRight: 5,
                }}
                name="sign-out"
                size={15}
                color="white"
              />
            }
            buttonStyle={{
              backgroundColor: colors.secondary,
              height: 45,
              marginTop: '5%',
              borderRadius: 10,
              marginBottom: 20,
              padding: 20,
              margin: 5,
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
