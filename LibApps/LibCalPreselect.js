jQuery(function($) {
  
  /** 
   * This object contains all needed info for library spaces, corresponding zone, order, and available
   * Please define the order, so that the zone preselction will be done according to that order
   * The zone in space with highest order will be considered fist. If it is not available, we'll then move to next zone
   * available will be updated by updateAvailability function
   */
  let space = {
    'Undergraduate Study Center': 
      {'zone': {'name': 'USC - Ground Floor', 'id': 287, "order": 1}, 'available': false},
    'Moelis Family Grand Reading Room': 
      {'zone': {'name': 'Moelis Reading - 1st floor', 'id': 288, "order": 2}, 'available': false},
    'Moelis Lounge': 
      {'zone': {'name': 'Moelis Lounge - 1st floor', 'id': 288, "order": 3}, 'available': false},
    'Lippincott South': 
      {'zone': {'name': 'Lippincott S - 2nd floor', 'id': 289, "order": 4}, 'available': false},
    'Lippincott North': 
      {'zone': {'name': 'Lippincott N - 2nd floor', 'id': 2215, "order": 5}, 'available': false},
    'USC Accessible': 
      {'zone': {'name': 'USC Accessible - ground floor', 'id': 2216, "order": 6}, 'available': false}
  }
  const location = {
    'Van Pelt seats': {'id': 10308, 'category': {'name': 'Tables', 'id': 19184}}
  }
  let currLocation = 'Van Pelt seats'
  const libCalApi = 'https://libcal.library.upenn.edu/1.1/space/category/' + location[currLocation]['category']['id'] + '?availability'

  /** 
   * update space availability from json returned by space API call
   */
  function updateAvailability(json) {
    for(let i = 0; i < json[0].items.length; i++) {
      let name = json[0].items[i]['name']
      if (json[0].items[i]['availability'].length) {
        space[name]['available'] = true
      } else {
        space[name]['available'] = false
      }
    }
  }

  /**
   * choose available zone based on order and availbility
   */
  const invalidId = -1
  function chooseZone() {
    let spacesSorted = Object.keys(space).sort(function(a,b){return space[a]['zone']['order'] - space[b]['zone']['order']})
    console.log(spacesSorted)
    for (let i = 0; i < spacesSorted.length; i++) {
      if (space[spacesSorted[i]]['available']) {
        let currZoneId = space[spacesSorted[i]]['zone']['id']
        return currZoneId
      }
    }
    return invalidId // if no available zone, return a invalid id 
  }

  function preselect() {
    // preselect Location, Zone and Capacity on this libcal reservation page: https://libcal.library.upenn.edu/r/new
    $('#new_reservation #s-lc-location').val(location['Van Pelt seats']['id']).change()
    // preselect zone according to order and availabilitty
    let currZoneId = chooseZone()
    if (currZoneId !== invalidId) {
      $('#new_reservation #s-lc-zone').val(currZoneId).change()
    } else {
      console.log('No available zone!')
    }
  }

  // make first API call to get access token
  $(document).ready(function() {
    const tokenApi = 'https://libcal.library.upenn.edu/1.1/oauth/token'
    const user = {client_id: '99', client_secret: '80fe13daecf14b0a8c62803b002fefa9', grant_type: 'client_credentials'}
    let TOKEN = ''
    $.ajax({
      dataType: 'text',
      type: "POST",
      data: user,
      url: tokenApi,
      success: function(text){
        let tokenObj = JSON.parse(text)
        TOKEN = tokenObj['access_token']
      },
      complete: function() {
        // make second API call to get libcal info
        $.ajax({
          dataType: 'json',
          type: "GET",
          url: libCalApi,
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'Bearer ' + TOKEN)
            console.log('Bearer ' + TOKEN)
          },
          success: function(json) {
            console.log(json)
            updateAvailability(json)
            preselect()
          }
        })
      }
    })
  })

});