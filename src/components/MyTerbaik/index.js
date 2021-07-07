import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function MyTerbaik() {
  useEffect(() => {
    // axios.get('https://zavalabs.com/sebatiku/api/barang.php').then(res => {
    //   console.log(res.data);
    //   setData(res.data);
    //   // setData(res.data.data);
    // });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      foto: 'https://p.ipricegroup.com/uploaded_de0bd5a2c11c5a2372f3a9482522b626.jpg',
      harga: 2999999,
      nama_barang: 'Oppo A74 5G',
      point: 200,
    },

    {
      foto: 'https://p.ipricegroup.com/uploaded_1d649b8520a23c048d8dcc9d8a723aac.jpg',
      harga: 2300000,
      nama_barang: 'Samsung Galaxy A20',
      point: 400,
    },
    {
      foto: 'https://images.samsung.com/is/image/samsung/p6pim/au/galaxy-s21/gallery/au-galaxy-s21-5g-g991-sm-g991bzvaats-thumb-368339835',
      harga: 14500000,
      nama_barang: 'Samsung S20 Ultra',
      point: 1200,
    },
    {
      foto: 'https://cf.shopee.co.id/file/cf0ca247a2ebd9b6bf3c13c35ed473a7',
      harga: 2100000,
      nama_barang: 'Vivo Y20',
      point: 200,
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Barang', item)}
        activeOpacity={1.0}>
        <Image style={styles.image} source={{uri: item.foto}} />

        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.title}>
              {' '}
              Rp. {new Intl.NumberFormat().format(item.harga)}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.subTitle}>{item.nama_barang}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              padding: 3,
              backgroundColor: colors.primary,
              borderTopLeftRadius: 20,
              paddingHorizontal: 20,
              color: colors.white,
            }}>
            {item.point} Point
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          // padding: 10,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            padding: 10,
            alignItems: 'center',
            paddingVertical: 5,
            backgroundColor: colors.primary,
          }}>
          <Icon type="ionicon" name="grid" color={colors.white} size={16} />
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: colors.white,
              left: 10,
              fontSize: 16,
            }}>
            PRODUK
          </Text>
        </View>
        <View style={{padding: 10}}>
          <FlatList
            numColumns={2}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: colors.black,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
