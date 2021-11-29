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
import { Flex, DatePicker, Padded, Select } from "@buffetjs/core"
import * as S from "./styles"

const qs = require("querystring")

const queryString = require("query-string")

// import PropTypes from 'prop-types';
import pluginId from "../../pluginId"

const getUrl = (to) =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`

const ccbnbMap = { SOUSA: 1, CARIRI: 2, FORTALEZA: 3 }

const HomePage = () => {
  // prettier-ignore

  const options = ["SOUSA", "CARIRI", "FORTALEZA"]

  const [initDate, setInitDate] = useState(moment())
  const [finalDate, setFinalDate] = useState(moment())
  const [ccbnb, setCcbnb] = useState("SOUSA")
  const [agenda, setAgenda] = useState("")
  const [agendas, setAgendas] = useState([])

  const [rows, setRows] = useState([])

  const [checked, setChecked] = useState(false)
  const [selectedIds, setSelectedIds] = useState(["2"])

  let selecteds = new Set()

  const [code, setCode] = useState("")
  const [code2, setCode2] = useState("")

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
    // setCode2(JSON.stringify(form))

    // const myUrl = `https://siscultural.herokuapp.com/agenda/select_import2?${qs.stringify(
    //   form
    // )}`

    // const myUrl = `https://siscultural.herokuapp.com/agenda/select_import2?${queryString.stringify(
    const myUrl = `https://localhost:8080/agenda/select_import2?${queryString.stringify(
      form
    )}`

    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*"
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }

    await axios
      // .get(myUrl, { headers: { "Access-Control-Allow-Origin": "*" } })
      .get(myUrl, { headers: headers })
      .then(({ data }) => {
        // setCode2(JSON.stringify(data.mock))
        console.log(JSON.stringify(data))
        setRows(data)
        setCode2(data)
      })

    // const mock = [
    //   {
    //     id: 1,
    //     titulo: "As aventuras de Ananse",
    //     grupoArtista: "Cia Beradeiros em Cena",
    //     release: "Lorem",
    //     duracao: 45
    //   }
    // ]

    // setRows(mock)
  }

  const handleCheck = (event) => {
    const id = event.target.id
    // console.log(selectedIds.includes(id))
    if (selectfedIds?.includes(id)) {
      console.log("no no no")
      // setSelectedIds((prev) => new Set([...prev].filter((x) => x !== id)))
    } else {
      console.log("nao tinha ainda")
      setSelectedIds((prev) => prev.push(id))
    }
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

          {code2}
        </S.Wrapper>
      </Flex>
      <br />
      {agendas &&
        agendas.length > 0 &&
        agendas.map((s) => <div key={`agenda ${s}`}>{JSON.stringify(s)}</div>)}
      <br />
      <br />
      AQUI
      {selectedIds && selectedIds.map((s) => <div key="${s}">{s}</div>)}
      <br />
      {rows?.length > 0 && (
        <>
          <S.Button onClick={checkAll}>Marcar todos</S.Button>
          <br />
          {rows.map((row) => (
            <S.InputForm key={row.id}>
              <input
                type="checkbox"
                id={row.id}
                // checked={() => selected.filter(x == row.id)}
                onChange={handleCheck}
              />
              <label>{row.titulo}</label>
            </S.InputForm>
          ))}
        </>
      )}
    </Padded>
  )
}

export default memo(HomePage)
