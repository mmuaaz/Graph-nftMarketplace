// follow the Graph Dashboard guide for installation of the essential components
// we have to install "graph CLI" globally using commnad RUN COMM: yarn global add @graphprotocol/graph-cli
// Initialize the Graph using RUN COMM: yarn global add @graphprotocol/graph-cli
// select correct settings > select chain > select dir > select network > paste Contract address > done install
// after successful instalation; You will have a boilerplate code to work with but in a new DIR
// in order to move the new DIR into the one dir which you created earlier RUN COMM: mv nft-marketplace/* ./
//this command will move the newly created dir to 1 folder back; and then you delete the empty folder
/FILES/;
//newly generated files that we got by installing cli for graph includes;
// generated:   the build or "pre-build" folder where we compile graph code
// src :    is where we define how to work with our SC, and its in "typescript" format so we are gonna have to work with typescript here
// network.json  :      contains the list of all the networks that we are going to work with
// schema.graphql  :    is going to be how we tell how to work with our events in the SC, and index them
/schema/; //follows the "graph ql" syntax
//"graph QL" is a query language for  your API
//instead of it being a relational database, it can query in a more graph way
//  subgraph.yaml  :    tell our subgraph how to combine all the files together
/==========================Graph Highlighter==================/;
//intsall the graph QL extension in vsCode
//installed GraphQL from Kumar Harsh
/schema.graphql/; // is going to define what entities we have in our SC; these will define how will our tables are going to look like
//These are gonna be events and "active ITem " table that we created in Moralis
//there are types in Graph that we create as an "entity" that we are going to query on  =>>>> these are defined in the "schema.graphql" file

/types/; // there are different types one of them is "id" and then we can add "!" mark to make it certain that this types must be present
/graph codegen/;
//if we RUN COMM: graph codegen     >  makes typescript typings for us
//grabs all stuff we have in our "schema.graphql" and puts it in this "generated" folder with a new file
//any time you update "schema.graphql" you should run this "graph codegen" command so that you update the files in the "generated" folder
/update "nft-marketplace.ts" file in the "generated" folder/;
/update subgraph.yaml/;
//look for "dataSources"
// so this dataSources block of code tells subgraph to start listening for events from the start of the ETH; we dont want that its gonna be very long; we want to tell it start listening
//for events right before our SC was deployed; so we make an entry in the dataSources with "startBlock"
// go to your SC in goerli etherscan and copy the block Number to paste it in "subgraph.yaml"; we have to paste the blockNumber such that its "=-1"
/Deploying Subgraph/;
// RUN COMM:  <copy "auth" command from the subGraph UI with deploy key at the end of it or manually copy and paste the deploy yourself>
//RUN COMM: graph codegen
// RUN COMM: graph build        > compiles everything thats available in the files you provided into a "build" folder which is gonna be pushed to subGraph
//then copy the last COMM from the subGraph UI > will prompt you to give it a version > add v0.0.1

// Build completed: Qmc74Z7bMez8Bz2uMeQinhtCGWHY6yGLrNmLL6sHEdJksS

// Deployed to https://thegraph.com/studio/subgraph/nft-marketplace

// Subgraph endpoints:
// Queries (HTTP):     https://api.studio.thegraph.com/query/37562/nft-marketplace/v0.0.1

//after that we  go back to Lesson15: nftmarketplace  dir and run mint-and-list.js script on goerli network; check the UI for updaing the events
/Reading from subGraph/;
//we then work on the front end for reading from the subGraph; go back to Graph DIR where we had clonned the DIR of moralis server project and follow the guide there
