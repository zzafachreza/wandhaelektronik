import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData, getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyTerbaik2 from '../../components/MyTerbaik2';

export default function Home({navigation}) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [point, setPoint] = useState(0);

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);
      // alert('email' + res.email + ' dan password ' + res.password);

      axios
        .post('https://zavalabs.com/wandhaelektronik/api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      axios
        .post('https://zavalabs.com/wandhaelektronik/api/get_member.php', {
          email: res.email,
          password: res.password,
        })
        .then(rese => {
          setUser(rese.data);
          storeData('user', rese.data);
        });
    });
  });

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);

      axios
        .post('https://zavalabs.com/wandhaelektronik/api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
      });
    });

    axios
      .post('https://zavalabs.com/wandhaelektronik/api/update_token.php', {
        id_member: user.id,
        token: token,
      })
      .then(res => {
        console.log('update token', res);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View
          style={{
            height: windowHeight / 9,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <View style={{flex: 1, paddingTop: 15}}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.white,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://api.whatsapp.com/send/?phone=6285248695042',
                )
              }
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="ionicon"
                name="logo-whatsapp"
                color={colors.white}
                size={windowWidth / 12}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.instagram.com/elektronik_handphone_muarabada/',
                )
              }
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="ionicon"
                name="logo-instagram"
                color={colors.white}
                size={windowWidth / 12}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="ionicon"
                name="cart-outline"
                color={colors.white}
                size={windowWidth / 12}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* bagian untuk point dan redeem */}

        <View
          style={{
            height: windowHeight / 13,
            flexDirection: 'row',
            padding: 10,
            backgroundColor: colors.white,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 5,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              // borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.primary,
              backgroundColor: colors.white,
            }}>
            <Icon
              type="ionicon"
              name="ribbon-outline"
              color={colors.primary}
              size={windowWidth / 13}
            />
            <View style={{marginLeft: 5}}>
              <Text
                style={{
                  fontSize: windowWidth / 40,
                  color: colors.primary,
                  fontFamily: fonts.secondary[400],
                }}>
                Point
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 35,
                  color: colors.primary,
                  fontFamily: fonts.secondary[600],
                }}>
                {new Intl.NumberFormat().format(point)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Hadiah')}
            style={{
              flex: 1,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.primary,
              backgroundColor: colors.white,
              shadowColor: colors.primary,
              shadowColor: '#000',
              shadowOffset: {
                width: -10,
                height: 2,
              },
              shadowOpacity: 0.44,
              shadowRadius: 5.32,
              elevation: 2,
            }}>
            <Icon
              type="ionicon"
              name="gift-outline"
              color={colors.primary}
              size={windowWidth / 13}
            />
            <View style={{marginLeft: 5}}>
              <Text
                style={{
                  fontSize: windowWidth / 40,
                  color: colors.primary,
                  fontFamily: fonts.secondary[400],
                }}>
                Daftar
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 35,
                  color: colors.primary,
                  fontFamily: fonts.secondary[600],
                }}>
                Hadiah
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingTop: 20,
            paddingHorizontal: 10,
            backgroundColor: colors.primary,
            paddingBottom: 20,
          }}>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Search')}>
            <View
              style={{
                flex: 1,
                paddingLeft: 20,
                borderWidth: 1,
                height: 45,
                borderRadius: 10,
                borderColor: colors.white,
                color: colors.white,
                flexDirection: 'row',
                fontSize: 18,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Light',
                    fontSize: 18,
                    color: colors.white,
                  }}>
                  Cari Layanan...
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}>
                <Icon
                  type="font-awesome"
                  name="search"
                  color={colors.white}
                  size={18}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>

        <MyCarouser />

        {/* <MyKategori /> */}
        <MyTerbaik />
        <MyTerbaik2 />
      </ScrollView>
    </ImageBackground>
  );
}
