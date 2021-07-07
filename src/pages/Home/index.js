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
import {getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';

export default function Home({navigation}) {
  const images = [
    {
      image:
        'https://images.bisnis-cdn.com/posts/2019/09/27/1153079/rruk-dynamix2.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2017/01/molen-kecil.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton8.jpg',
    },
  ];

  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
      });
    });
    axios
      .post('https://zavalabs.com/pembantuku/api/update_token.php', {
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
            height: 100,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingTop: 15}}>
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="cart-outline" color={colors.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 10,
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
      </ScrollView>
    </ImageBackground>
  );
}
