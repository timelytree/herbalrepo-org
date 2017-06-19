class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  storage :file
  after :remove, :delete_empty_upstream_dirs

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def delete_empty_upstream_dirs
    path = ::File.expand_path(store_dir, root)
    Dir.delete(path) # fails if path not empty dir
  rescue SystemCallError
    true # nothing, the dir is not empty
  end

  def extension_whitelist
    %w(jpg jpeg gif png svg)
  end

  version :icon do
    process resize_to_fit: [30, 30]
  end

  version :thumb do
    process resize_to_fit: [175, 175]
  end
end
