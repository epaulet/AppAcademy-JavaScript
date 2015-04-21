json.extract! pokemon, *(pokemon.attribute_names - ["created_at", "updated_at"])



if display_toys
  json.toys do
    pokemon.toys.each do |toy|
      json.set! toy.id do
        json.partial! './toys/toy', toy: toy
      end
    end
  end
end
