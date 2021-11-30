/*
 *
 * HomePage
 *
 */

import axios from "axios"
import React, { memo, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HeaderNav, LoadingIndicator, PluginHeader } from "strapi-helper-plugin"
import moment from "moment"
import { Flex, DatePicker, Padded, Select, Checkbox } from "@buffetjs/core"
import * as S from "./styles"

const qs = require("querystring")

const queryString = require("query-string")

// import PropTypes from 'prop-types';
import pluginId from "../../pluginId"

const getUrl = (to) =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`

const ccbnbMap = { SOUSA: 1, CARIRI: 2, FORTALEZA: 3 }

const HomePage = () => {
  // checkBox
  const message = areAllCheckboxesSelected ? "Desmarcar tudo" : "Marcar tudo"
  const [value, setValue] = useState(false)
  const [checkboxes, setCheckboxValue] = useState({})
  const areAllCheckboxesSelected = Object.keys(checkboxes).every(
    (key) => checkboxes[key] === true
  )

  const hasSomeCheckboxesSelected = Object.keys(checkboxes).some(
    (key) => checkboxes[key] === true
  )

  // const hasSomeCheckboxesSelected = rows
  //   .map((r) => r)
  //   .some((r) => r.checked === true)

  const handleChange = () => {
    const valueToSet = !areAllCheckboxesSelected

    setCheckboxValue((prevState) => {
      return Object.keys(prevState).reduce((acc, current) => {
        acc[current] = valueToSet

        return acc
      }, {})
    })
  }
  // end checkboxes

  // prettier-ignore
  const options = ["SOUSA", "CARIRI", "FORTALEZA"]

  const [initDate, setInitDate] = useState(moment())
  const [finalDate, setFinalDate] = useState(moment())
  const [ccbnb, setCcbnb] = useState("SOUSA")
  const [agenda, setAgenda] = useState("")
  const [agendas, setAgendas] = useState([])

  const [rows, setRows] = useState({})

  const [checked, setChecked] = useState(false)
  const [selectedIds, setSelectedIds] = useState(["2"])

  let selecteds = new Set()

  useEffect(() => {
    async function fn() {
      const c = await axios
        .get("http://localhost:1337/agenda-contents")
        .then((res) => {
          console.log(res)
          const agendas = res.data.map((agenda) => `${agenda.slug}`)
          setAgendas(agendas)
        })
        .catch((e) => setCode("Deu erro " + e))
    }
    fn()
  }, [])

  // useEffect(() => {
  //   async function fetchData() {
  //     const x = await axios
  //       .get("http://localhost:1337/api/activities")
  //       .then((res) => console.log("aqui", res))
  //   }
  // }, [])

  const checkAll = (event) => {
    event.preventDefault()
    setChecked(!checked)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = {
      unit: ccbnbMap[ccbnb],
      initialDate: initDate.format("DD/MM/yyyy"),
      finalDate: finalDate.format("DD/MM/yyyy")
    }

    // const myUrl = `https://siscultural.herokuapp.com/agenda/select_import2?${qs.stringify(
    //   form
    // )}`

    // const myUrl = `https://siscultural.herokuapp.com/agenda/select_import2?${queryString.stringify(
    const myUrl = `http://localhost:8080/agenda/select_import2?${queryString.stringify(
      form
    )}`

    await axios
      .get(myUrl, { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(({ data }) => {
        // const rows = data?.ativs?.map((ativ) => {
        //   return { ...ativ, checked: false }
        // })
        // setRows(rows)

        const rows = data?.ativs?.reduce((acc, current) => {
          acc[current.id] = current
          return acc
        }, {})
        setRows(rows)
        // console.log("rows", rows)

        const checkboxes = data?.ativs
          ?.map((ativ) => {
            return ativ.id
          })
          .reduce((acc, current) => {
            acc[current] = false

            return acc
          }, {})

        setCheckboxValue(checkboxes)
      })
  }

  const handleCheck = (event) => {
    const id = event.target.id
    // // console.log(selectedIds.includes(id))
    // if (selectfedIds?.includes(id)) {
    //   console.log("no no no")
    //   // setSelectedIds((prev) => new Set([...prev].filter((x) => x !== id)))
    // } else {
    //   console.log("nao tinha ainda")
    //   setSelectedIds((prev) => prev.push(id))
    // }
  }

  return (
    <Padded top bottom right left size="md">
      <Flex
        flexDirection="column"
        justifyContent="justify-content"
        // alignItems="center"
      >
        <h1>{pluginId}&apos;s HomePage</h1>

        <Link to={getUrl("test")}>test</Link>

        <p>Happy coding:</p>

        <S.Wrapper>
          <S.InputGroupWrapper>
            <b>Início</b>
            <DatePicker
              name="datepicker" // This props is required
              onChange={({ target }) => setInitDate(target.value)}
              value={initDate}
            />
          </S.InputGroupWrapper>

          <S.InputGroupWrapper>
            <b>Fim</b>
            <DatePicker
              name="datepicker" // This props is required
              onChange={({ target }) => setFinalDate(target.value)}
              value={finalDate}
            />
          </S.InputGroupWrapper>

          <S.InputGroupWrapper>
            <b>CCBNB</b>
            <S.InputGroupWrapper>
              <Select
                name="select"
                onChange={({ target: { value } }) => {
                  setCcbnb(value)
                }}
                options={options}
                value={ccbnb}
              />
            </S.InputGroupWrapper>
          </S.InputGroupWrapper>

          <S.Button onClick={handleSubmit}>Buscar</S.Button>

          <hr />

          {agendas && agendas.length > 0 && (
            <S.InputGroupWrapper>
              <b>Importar Atividades para a Agenda</b>
              <S.InputGroupWrapper>
                <Select
                  name="select"
                  onChange={({ target: { value } }) => {
                    setAgenda(value)
                  }}
                  options={agendas}
                  value={agenda}
                />
              </S.InputGroupWrapper>
            </S.InputGroupWrapper>
          )}

          {Object.keys(rows).length > 0 && (
            <div>
              <Checkbox
                name="selectAll"
                onChange={handleChange}
                message={message}
                someChecked={
                  hasSomeCheckboxesSelected && !areAllCheckboxesSelected
                }
                value={areAllCheckboxesSelected}
              />
              <S.NoBullentUl>
                {Object.keys(checkboxes).map((current) => {
                  console.log("current", current)
                  console.log("checkboxes", checkboxes)
                  console.log("rowssss", rows)
                  console.log(rows[current])
                  // console.log(rows[current].nome)

                  return (
                    <li key={current} style={{ padding: 15 }}>
                      <Checkbox
                        name={current}
                        // message={`ok ${current}`}
                        // message={rows[current].nome}
                        value={checkboxes[current]}
                        onChange={({ target: { name, value } }) => {
                          setCheckboxValue((prevState) => ({
                            ...prevState,
                            [name]: value
                          }))
                        }}
                      />
                    </li>
                  )
                })}
              </S.NoBullentUl>
            </div>
          )}
        </S.Wrapper>
      </Flex>
    </Padded>
  )
}

export default memo(HomePage)
