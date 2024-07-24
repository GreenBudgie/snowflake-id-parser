const snowflakeIdDecimalLength = 59
const solarTimestamp = 1585710000000

const snowflakeIdInput = document.getElementById("snowflake_id_input")

const parseButton = document.getElementById("parse_button")

parseButton.addEventListener("click", parse)

const resultTable = document.getElementById("result_table")
const detailedInfo = document.getElementById("detailed_info")

const resultDateTimeElements = document.getElementsByClassName("result_date_time")
const nodeNumberDecimalElements = document.getElementsByClassName("node_number_decimal")
const sequenceNumberDecimalElements = document.getElementsByClassName("sequence_number_decimal")
const snowflakeIdDecimalElements = document.getElementsByClassName("snowflake_id_decimal")
const snowflakeIdBinaryElements = document.getElementsByClassName("snowflake_id_binary")
const fullSnowflakeIdBinaryElements = document.getElementsByClassName("full_snowflake_id_binary")
const timestampBinaryElements = document.getElementsByClassName("timestamp_binary")
const nodeNumberBinaryElements = document.getElementsByClassName("node_number_binary")
const sequenceNumberBinaryElements = document.getElementsByClassName("sequence_number_binary")
const timestampDecimalElements = document.getElementsByClassName("timestamp_decimal")
const resultTimestampElements = document.getElementsByClassName("result_timestamp")

function parse() {
    let decimalSnowflakeId = snowflakeIdInput.value
    let binarySnowflakeId = toBinary(decimalSnowflakeId)
    let fullBinarySnowflakeId = addLeadingZeros(binarySnowflakeId)

    let binaryData = splitBinaryID(fullBinarySnowflakeId)
    let decimalData = getDecimalData(binaryData)

    let resultTimestamp = solarTimestamp + decimalData.decimalTimestamp
    let resultDate = new Date(resultTimestamp)

    updateText(snowflakeIdDecimalElements, decimalSnowflakeId)
    updateText(snowflakeIdBinaryElements, binarySnowflakeId)
    updateText(fullSnowflakeIdBinaryElements, fullBinarySnowflakeId)
    updateText(timestampBinaryElements, binaryData.binaryTimestamp)
    updateText(nodeNumberBinaryElements, binaryData.binaryNodeNumber)
    updateText(sequenceNumberBinaryElements, binaryData.binarySequenceNumber)
    updateText(timestampDecimalElements, decimalData.decimalTimestamp)
    updateText(nodeNumberDecimalElements, decimalData.decimalNodeNumber)
    updateText(sequenceNumberDecimalElements, decimalData.decimalSequenceNumber)
    updateText(resultTimestampElements, resultTimestamp)
    updateText(resultDateTimeElements, resultDate)

    resultTable.style.display = "block"
    detailedInfo.style.display = "block"
}

function splitBinaryID(fullBinaryID) {
    return {
        binaryTimestamp: fullBinaryID.slice(0, 41),
        binaryNodeNumber: fullBinaryID.slice(41, 51),
        binarySequenceNumber: fullBinaryID.slice(51, 59)
    }
}

function getDecimalData(binaryData) {
    return {
        decimalTimestamp: toDecimal(binaryData.binaryTimestamp),
        decimalNodeNumber: toDecimal(binaryData.binaryNodeNumber),
        decimalSequenceNumber: toDecimal(binaryData.binarySequenceNumber)
    }
}

function toBinary(decimal) {
    return Number(decimal).toString(2)
}

function toDecimal(binary) {
    return parseInt(binary, 2)
}

function addLeadingZeros(binarySnowflakeId) {
    return binarySnowflakeId.toString().padStart(snowflakeIdDecimalLength, '0')
}

function updateText(elements, text) {
    for (let resultDateTimeElement of elements) {
        resultDateTimeElement.textContent = text
    }
}