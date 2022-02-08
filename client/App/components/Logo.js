import { View, Image } from 'react-native';

import { styles } from '../styles/LogoStyles';

const backgroundImage = require('../assets/images/background.png');
const appLogo = require('../assets/images/converter.png');

const image = (imageUrl, style) => {
    return (
        <Image 
            source={imageUrl}
            style={style}
            resizeMode="contain"
        />
    )
}

export const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            {image(backgroundImage, styles.logoBackground)}
            {image(appLogo, styles.logo)}
        </View>
    )
}