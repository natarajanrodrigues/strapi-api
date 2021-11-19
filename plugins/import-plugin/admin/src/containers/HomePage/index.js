/*
 *
 * HomePage
 *
 */

import axios from "axios"
import React, { memo, useEffect, useState } from "react"
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId"

const HomePage = () => {
  // prettier-ignore

  console.log("res")

  const [code, setCode] = useState("")

  useEffect(() => {
    // axios
    //   .get("https://localhost:1337/centro-cultural")
    //   .then((res) => {
    //     // console.log(res)
    //     setCode(JSON.stringify(res))
    //   })
    //   .catch((e) => setCode("Deu erro " + e))

    // axios
    //   .get("http://localhost:1337/activities")
    //   .then((res) => {
    //     setCode(JSON.stringify(res))
    //   })
    //   .catch((e) => setCode("Deu erro " + e))

    // const data = strapi.service["import-plugin"].getProp()
    // setCode(JSON.stringify(data))

    axios
      .get("http://localhost:1337/import-plugin")
      .then((res) => {
        setCode(JSON.stringify(res))
      })
      .catch((e) => setCode("Deu erro " + e))
  }, [])

  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding:</p>
      {code}
    </div>
  )
}

export default memo(HomePage)
