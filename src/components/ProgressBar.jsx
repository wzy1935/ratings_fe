

function ProgressBar(props) {
  const { percent, width, height, color } = props;
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: '#dee2e6',
    borderRadius: '5px',
    position: 'relative',
    display: 'inline-block',
  };
  const innerStyle = {
    width: `${percent}%`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: '5px',
    transition: 'width 0.5s ease-in-out',
  };
  return (
    <div style={style}>
      <div style={innerStyle} />
    </div>
  );
}

export default ProgressBar;