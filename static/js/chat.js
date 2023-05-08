$(document).ready(function() {
    $('#chat-form').on('submit', function(e) {
      e.preventDefault();
      var user_input = $('#chat-input').val();
      $('#chat-area').append('<div class="user-message message">' + "you: " + user_input + '</div>');
      $('#chat-history').scrollTop($('#chat-history')[0].scrollHeight);
      $('#chat-input').val('');
      $.ajax({
        type: 'POST',
        url: '/get_bot_response',
        data: {text: user_input},
        success: function(data) {
          var bot_response = data['response'];
          $('#chat-area').append('<div class="bot-message message">' + "bot: " + bot_response + '</div>');
          $('#chat-history').scrollTop($('#chat-history')[0].scrollHeight);
        },
        error: function() {
          $('#chat-area').append('<div class="bot-message message">Error: Could not contact server.</div>');
          $('#chat-history').scrollTop($('#chat-history')[0].scrollHeight);
        }
      });
    });
  });