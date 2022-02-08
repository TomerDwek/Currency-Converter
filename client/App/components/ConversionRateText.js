import { format } from 'date-fns';

import { Text } from 'react-native';
import { styles } from "../styles/HomeScreenStyles";

export const ConversionRateText = ({ baseCurrency, quoteCurrency, conversionRate, date }) => {
    return (
        <Text style={styles.text}>
            {`1 ${baseCurrency} = ${Number(conversionRate).toFixed(4)} ${quoteCurrency} as of ${
                date && format(new Date(date), 'MMMM do, yyyy')
            }.`}
        </Text>
    )
}
