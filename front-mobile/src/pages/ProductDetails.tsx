import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { api } from "../services";
import arrow from "../assets/leftArrow.png";
import { text, theme } from "../styles";
import { useNavigation } from '@react-navigation/native';

interface ProductDetailProps {
  route: any;
  params: object;
  id: number;
}

const ProductDetails  = ({
  route: {
    params: { id },
  },
}: ProductDetailProps) => {

  const navigation = useNavigation();

  const [product, setProduct] = useState({
    id: null,
    name: null,
    description: null,
    price: null,
    imgUrl: undefined,
    date: null,
    categories: [],
  });
  const [loading, setLoading] = useState(false);

  async function loadProductData() {
    setLoading(true);
    const res = await api.get(`products/${id}`);
    setProduct(res.data);
    setLoading(false);
  }

  useEffect(() => {
    loadProductData();
  }, []);

  return (
    <View style={theme.detailContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={theme.detailCard}>
          <TouchableOpacity style={theme.goBackContainer} onPress={() => navigation.goBack()}>
            <Image source={arrow} />
            <Text style= {text.goBackText}>Voltar</Text>
          </TouchableOpacity>
          <View style={theme.productImageContainer}>
            <Image
              source={{ uri: product.imgUrl }}
              style={theme.productDetailsImage}
            />
          </View>
          <Text style={text.productDetailsName}>{product.name}</Text>
          <View style={theme.priceContainer}>
            <Text style={text.currency}>R$</Text>
            <Text style={text.productPrice}>{product.price}</Text>
          </View>
          <ScrollView style={theme.scrollTextContainer}>
            <Text style={text.productDescription}>{product.description}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
