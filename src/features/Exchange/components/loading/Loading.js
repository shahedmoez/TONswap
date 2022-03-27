import styles from './Loading.module.css'
export default function Loading(props) {

  const loadingDots = {
    backgroundColor: props.color,
  }
  var scale = parseInt(props.size) / 80;
  const loadingDiv = {
    transform: 'scale(' + scale + ')',
    width: props.size,
    height: props.size,
    position: 'absolute'
  }
  const loading_countiner = {
    position: 'relative',
    top: props.top,
    bottom: props.bottom,
    right: props.right,
    left: props.left
  }
  return (
    <>
      <div style={loading_countiner}>
        <div style={loadingDiv} className={styles.lds_roller}><div style={loadingDots}></div><div style={loadingDots}></div><div style={loadingDots}></div><div style={loadingDots}></div><div style={loadingDots}></div><div style={loadingDots}></div><div style={loadingDots}></div><div style={loadingDots}></div></div>
      </div>
    </>
  )
}