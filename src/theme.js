import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#555555',
    delete: '#ff0000',
    primary: '#0366d6',
    appBarBg: '#24292e',
    appBarText: '#ffffff',
    cardBgColor: 'white',
    mainBgColor: '#e1e4e8'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  thumbnails: {
    width: 50,
    height: 50
  },
  buttons: {
    backgroundColor: '#0366d6',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    fontWeight: '700'
  },
  separator: {
    height: 10,
  },
  forms: {
    display: 'flex',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    padding: 15,
  }
};

export default theme;