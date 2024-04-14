function GetPathParams($defaultPath, $contractPath) {
    return $defaultPath || $contractPath || 'tests/pactum'
}
module.exports = { GetPathParams }
