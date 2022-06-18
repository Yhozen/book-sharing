import { Card, Text } from '@geist-ui/core'
import { ExtendedPage } from 'models/app.model'

const App: ExtendedPage = () => {
  return (
    <Card>
      <Text>Hi!</Text>
    </Card>
  )
}

App.pageName = 'Main'

export default App
