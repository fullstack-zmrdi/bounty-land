import React from 'react'
import ReactDOMStream from 'react-dom-stream/server'

export default (appHtml, cssLink = false) => {
  return ReactDOMStream.renderToStaticMarkup(
    <html>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta charSet='utf-8' />
        <title>Bounty Land</title>
        <link rel='icon' href='/img/bounty-land.png' />
        {cssLink && <link rel='stylesheet' href='/bounty-land.css' />}
      </head>
      <body>
        <div id='wrapper' dangerouslySetInnerHTML={{__html: appHtml}} />
        <script src='/bundle.js' />
        <script async defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`} />
      </body>
    </html>
  )
}
