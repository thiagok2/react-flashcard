export default function Main({ children }) {
  const styles = {
    main: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 10
    }
  }

  
  return <main style={styles.main}>{children}</main>;
}

