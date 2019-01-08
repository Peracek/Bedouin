import axios from 'axios'
import qs from 'query-string'

import config from '../../config.json'


let authenticated = false
export const authStorage = {} as { token?: string }

export const authenticate = async () => {
if(config.authentication && config.authentication.enable && !authenticated) {
  
  const { url: currentUrl, query: { code, session_state } } = qs.parseUrl(window.location.href)
  const { oauthUrl, clientId, openIdUrl } = config.authentication

  if(code) {
    authenticated = true
    window.history.replaceState({}, document.title, '/');

    const body = {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: currentUrl,
      code
    }

    axios
      .post(
        openIdUrl,
        qs.stringify(body)
      )
      .then(res => {
        const { data: { access_token } } = res
        authStorage.token = access_token
      })
      .catch(err => {
        console.error(err)
      })
  } else {
    

    // IT DOES NOT KEEP ORDER OR PARAMS :((
    // const queryParams = {
    //   response_type: 'code',
    //   client_id: clientId,
    //   redirect_url: currentLocation
    // }

    // const oauthUrl = `${oauthRedirectUrl}?${queryString.stringify(queryParams)}`

    // const oauthUrl = `${oauthRedirectUrl}?response_type=code&client_id=${clientId}&redirect_url=${currentLocation}`
    const oauthUrlParams = `${oauthUrl}?client_id=${clientId}&response_type=code&redirect_uri=${currentUrl}`
    window.location.href = oauthUrlParams
  }
}
}