import React from 'react';
import { 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    TouchableOpacityProps, 
    TextStyle,
    StyleProp 
} from 'react-native';

interface BotaoCustomizadoProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  titleStyle?: StyleProp<TextStyle>; 
}

const BotaoCustomizado: React.FC<BotaoCustomizadoProps> = ({ 
    title, 
    onPress, 
    disabled = false, 
    style, 
    titleStyle,
    ...rest 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        disabled && styles.disabledButton,
        style 
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={[
          styles.buttonText, 
          titleStyle
      ]}>
          {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5722', 
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#FF9800',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BotaoCustomizado;