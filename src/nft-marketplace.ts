import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  NftMarketplace,
  ItemBought as ItemBoughtEvent, //changing the names of these events to avoid confusions
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ItemListed,
  ActiveItem,
  ItemBought,
  ItemCanceled,
} from "../generated/schema";
// whenever an item is listed we want our graph to:

//save that event in our subgraph
// update the activeItem table

//get or create an itemListed object
//each items needs an ID that we have to make and assign

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
  let itemCanceled = ItemCanceled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemCanceled) {
    itemCanceled = new ItemCanceled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;

  // it activeItem object doesnt have a buyer then we give it a dead address with 36 zeros lowercase d,E,a,D
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );
  //this is how we are gonna decide if an item is still on the market or has been bought or not
  //if we have a dEaD address as the buyer that means it has been canceled; thats we tell its on the market or not

  //how we tell/;
  //dead address mean its been canceled
  // empty address means its on the market
  // real address means its been bought by some address

  itemCanceled.save();
  activeItem!.save();
}

export function handleItemBought(event: ItemBoughtEvent): void {
  //we have to create an itemBought object which is different from itemBought event as already have an itemBought event
  //in typescript these are two different types itemBought event and itemBought object; we have to import these itemBought objects
  // we just have to import these types from "schema.ts" as they are already created there
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  //this is how load an item by loading its ID from getIdFromEventParams function

  //Updating ActiveItem table
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId; // activeItem has all of these paramters passing from ItemListed except for "buyer"

  //updating an activeItem to be a new buyer
  activeItem!.buyer = event.params.buyer; // again ! mark at the end of activeItem means we must have an activeItem.buyer
  //in this way we are coding it like if it has a buyer then we are updating it, it doesnt then its still on the market

  //saving these details in the table

  itemBought.save(); //saving this itemBought event as an object in our graph protocol
  activeItem!.save();
}

// a function to assign an ID to each entry that we create in ItemListed

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  //in the params () section we have to declare types after ":" in typescript
  return tokenId.toHexString() + nftAddress.toHexString();
}
