// // pipeline {
// //     agent any
    
// //     environment {
// //         DOCKER_HUB_CREDENTIALS = credentials('hixej84931fna6') // Jenkins credentials ID for Docker Hub
// //         IMAGE_TAG = "latest"
// //     }
    
// //     stages {
// //         stage('Build') {
// //             steps {
// //                 retry(max: 3) {
// //                     git 'https://github.com/SKaushik07/CI-CDEXP.git'
// //                 }
// //                 sh 'npm install'
// //             }
// //         }
        
// //         stage('Dockerize and Push to Docker Hub') {
// //             steps {
// //                 script {
// //                     docker.build("hixej84931fna6/nodejs_exp:${IMAGE_TAG}")
// //                     withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_HUB_CREDENTIALS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD']]) {
// //                         docker.withRegistry('https://hub.docker.com', 'DOCKER_HUB_CREDENTIALS') {
// //                             docker.image("hixej84931fna6/nodejs_exp:${IMAGE_TAG}").push()
// //                         }
// //                     }
// //                 }
// //             }
// //         }
        
// //         // stage('Deploy to Kubernetes') {
// //         //     steps {
// //         //         // Use Kubernetes plugin to deploy to Kubernetes cluster
// //         //         withCredentials([file(credentialsId: 'kube-config-id', variable: 'KUBECONFIG')]) {
// //         //             sh """
// //         //             export KUBECONFIG=$KUBECONFIG
// //         //             kubectl apply -f path/to/your/kubernetes/deployment.yaml --namespace default
// //         //             """
// //         //         }
// //         //     }
// //         // }
// //     }
// // }
// pipeline {
//     agent any

//     environment {
//         IMAGE_TAG = "latest"
//         DOCKER_HUB_CREDENTIALS = credentials('docker-hub-config') // Jenkins credentials ID for Docker Hub
//     }

//     stages {
//         stage('Clone repository') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Build image') {
//             steps {
//                 git 'https://github.com/SKaushik07/CI-CDEXP.git'
//                 sh 'npm install'
//                 // Build Docker image
//                 docker.withRegistry('https://hub.docker.com', 'DOCKER_HUB_CREDENTIALS') {
//                     docker.build("hixej84931fna6/nodejs_exp:${IMAGE_TAG}")
//                 }
//             }
//         }

//         stage('Test image') {
//             steps {
//                 script {
//                     // Optional: Add test steps if needed
//                     echo "Testing the Docker image..."
//                 }
//             }
//         }

//         stage('Push image') {
//             steps {
//                 script {
//                     // Push Docker image to Docker Hub
//                     docker.withRegistry('https://hub.docker.com', 'DOCKER_HUB_CREDENTIALS') {
//                         docker.image("hixej84931fna6/nodejs_exp:${IMAGE_TAG}").push()
//                     }
//                 }
//             }
//         }

//         stage('Trigger ManifestUpdate') {
//             steps {
//                 echo "Triggering updatemanifest job"
//                 build job: 'updatemanifest', parameters: [string(name: 'DOCKERTAG', value: "${BUILD_NUMBER}")]
//             }
//         }
//     }
// }



// pipeline {
//     agent any

//     environment {
//         imagename = "hixej84931fna6/nodejs_exp"
//         dockerImage = ""
//         registryCredential = credentials('docker-hub-config')
//     }

//   stages {
//     stage('Cloning Repo') {
//       steps {
//         git branch:'main',url: 'https://github.com/SKaushik07/CI-CDEXP.git'
//       }
//     }
//     stage('Building Image') {
//       steps{
//         script {
//           sh 'chmod +x script.sh'
//           sh './script.sh'
//           sh 'docker build -t hixej84931fna6/nodejs_exp:latest .'
//         }
//       }
//     }
//     stage('Pushing Image') {
//       steps{
//         script {
//           docker.withRegistry( '', registryCredential ) {
//             dockerImage.push("latest")
//           }
//         }
//       }
//     }
    
//     // post {
//     //     success {
//     //         echo 'Pipeline successfully completed!'
//     //     }
//     //     failure {
//     //         echo 'Pipeline failed :('
//     //     }
//     // }
// }
// }


///////////////////



pipeline {
    agent {
        label 'macOS'  
    }
    environment {
        DOCKER_IMAGE = 'hixej84931fna6/nodejs_exp:latest'  // Update with your Docker image name
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}")
                    dockerImage.inside {
                        sh 'npm install'  
                    }
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def dockerImage = docker.image("${DOCKER_IMAGE}")
                    dockerImage.inside {
                        sh 'npm test'  // Example command to run tests inside the Docker container
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.example.com', 'docker-hub-config') {
                        def dockerImage = docker.image("${DOCKER_IMAGE}")
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
