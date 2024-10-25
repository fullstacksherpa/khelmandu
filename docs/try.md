com.devSherpa.khelmandu

usecallback is a react hook that helps you optimize the performance of your components by memoizing callback functions.

const renderItem = React.useCallback(
({item}:{item: Post})=><Card {...item}/>, []
)

Stack navigation creates a stack of screens where users can navigate forward and backward, mimicking a browser like history.
