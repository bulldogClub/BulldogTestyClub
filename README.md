# Bulldog Testy Club
The Bulldog Testy Club is a collection of a certain amount of unique Bulldog NFTs — unique digital collectibles living on the Polygon blockchain. Owning a Bulldog doubles as your membership to the Club.
## how to use 
### add config
```shell
touch .mnemonic 
touch .polygonApiKey
touch .ethApiKey
touch .alchemyKey
touch .infuraKey
```

fill your these keys 

### install 
```shell
npm install 
```
### deploy
```shell
npm run deploy:polygon 
```
### verify
```shell
truffle run verify --network BulldogTestyClubSeason1 polygon
truffle run verify BulldogTestyClub --network polygon 
```
