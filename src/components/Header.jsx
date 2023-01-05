export default function Header({ children, size }) {

  return (
    <header>
      <div style={styles.container}>
        <h1 style={styles.h1}>{children}</h1>
      </div>
    </header>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgba(191, 219, 254)',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20
  },
  h1: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 2
  }
}